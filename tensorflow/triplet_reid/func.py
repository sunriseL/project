#!/usr/bin/env python3
from argparse import ArgumentParser,Namespace
from importlib import import_module
from itertools import count
import os

import h5py
import json
import numpy as np
import tensorflow as tf
from sklearn.metrics import average_precision_score
from aggregators import AGGREGATORS
import common
import loss

def flip_augment(image, fid, pid):
    """ Returns both the original and the horizontal flip of an image. """
    images = tf.stack([image, tf.reverse(image, [1])])
    return images, tf.stack([fid]*2), tf.stack([pid]*2)


def five_crops(image, crop_size):
    """ Returns the central and four corner crops of `crop_size` from `image`. """
    image_size = tf.shape(image)[:2]
    crop_margin = tf.subtract(image_size, crop_size)
    assert_size = tf.assert_non_negative(
        crop_margin, message='Crop size must be smaller or equal to the image size.')
    with tf.control_dependencies([assert_size]):
        top_left = tf.floor_div(crop_margin, 2)
        bottom_right = tf.add(top_left, crop_size)
    center       = image[top_left[0]:bottom_right[0], top_left[1]:bottom_right[1]]
    top_left     = image[:-crop_margin[0], :-crop_margin[1]]
    top_right    = image[:-crop_margin[0], crop_margin[1]:]
    bottom_left  = image[crop_margin[0]:, :-crop_margin[1]]
    bottom_right = image[crop_margin[0]:, crop_margin[1]:]
    return center, top_left, top_right, bottom_left, bottom_right
def func():
    print("its func")

def main(dataset='data/query.csv',image_root=None,experiment_root='/home/sunrise/experiments/my_experiment',filename='query.h5'):
    # Verify that parameters are set correctly.
    #args = parser.parse_args()
    #print(args)
    args = Namespace(aggregator='mean', batch_size=256, checkpoint='/home/sunrise/experiments/my_experiment/checkpoint-25000', crop_augment=None, dataset='data/query.csv', experiment_root='/home/sunrise/experiments/my_experiment', filename='query.h5', flip_augment=True, image_root=None, loading_threads=8, quiet=False)
    print(args)

    # Possibly auto-generate the output filename.
    if args.filename is None:
        basename = os.path.basename(args.dataset)
        args.filename = os.path.splitext(basename)[0] + '_embeddings.h5'
    args.filename = os.path.join(args.experiment_root, args.filename)

    # Load the args from the original experiment.
    args_file = os.path.join(args.experiment_root, 'args.json')

    if os.path.isfile(args_file):
        if not args.quiet:
            print('Loading args from {}.'.format(args_file))
        with open(args_file, 'r') as f:
            args_resumed = json.load(f)

        # Add arguments from training.
        for key, value in args_resumed.items():
            args.__dict__.setdefault(key, value)

        # A couple special-cases and sanity checks
        if (args_resumed['crop_augment']) == (args.crop_augment is None):
            print('WARNING: crop augmentation differs between training and '
                  'evaluation.')
        args.image_root = args.image_root or args_resumed['image_root']
    else:
        raise IOError('`args.json` could not be found in: {}'.format(args_file))

    # Check a proper aggregator is provided if augmentation is used.
    if args.flip_augment or args.crop_augment == 'five':
        if args.aggregator is None:
            print('ERROR: Test time augmentation is performed but no aggregator'
                  'was specified.')
            exit(1)
    else:
        if args.aggregator is not None:
            print('ERROR: No test time augmentation that needs aggregating is '
                  'performed but an aggregator was specified.')
            exit(1)

    if not args.quiet:
        print('Evaluating using the following parameters:')
        for key, value in sorted(vars(args).items()):
            print('{}: {}'.format(key, value))

    # Load the data from the CSV file.
    data_pids, data_fids = common.load_dataset(args.dataset, args.image_root)

    net_input_size = (args.net_input_height, args.net_input_width)
    pre_crop_size = (args.pre_crop_height, args.pre_crop_width)

    # Setup a tf Dataset containing all images.
    dataset = tf.data.Dataset.from_tensor_slices(data_fids)

    # Convert filenames to actual image tensors.
    dataset = dataset.map(
        lambda fid: common.fid_to_image(
            fid, tf.constant('dummy'), image_root=args.image_root,
            image_size=pre_crop_size if args.crop_augment else net_input_size),
        num_parallel_calls=args.loading_threads)

    # Augment the data if specified by the arguments.
    # `modifiers` is a list of strings that keeps track of which augmentations
    # have been applied, so that a human can understand it later on.
    modifiers = ['original']
    if args.flip_augment:
        dataset = dataset.map(flip_augment)
        dataset = dataset.apply(tf.contrib.data.unbatch())
        modifiers = [o + m for m in ['', '_flip'] for o in modifiers]

    if args.crop_augment == 'center':
        dataset = dataset.map(lambda im, fid, pid:
            (five_crops(im, net_input_size)[0], fid, pid))
        modifiers = [o + '_center' for o in modifiers]
    elif args.crop_augment == 'five':
        dataset = dataset.map(lambda im, fid, pid: (
            tf.stack(five_crops(im, net_input_size)),
            tf.stack([fid]*5),
            tf.stack([pid]*5)))
        dataset = dataset.apply(tf.contrib.data.unbatch())
        modifiers = [o + m for o in modifiers for m in [
            '_center', '_top_left', '_top_right', '_bottom_left', '_bottom_right']]
    elif args.crop_augment == 'avgpool':
        modifiers = [o + '_avgpool' for o in modifiers]
    else:
        modifiers = [o + '_resize' for o in modifiers]

    # Group it back into PK batches.
    dataset = dataset.batch(args.batch_size)

    # Overlap producing and consuming.
    dataset = dataset.prefetch(1)

    images, _, _ = dataset.make_one_shot_iterator().get_next()

    # Create the model and an embedding head.
    model = import_module('nets.' + args.model_name)
    head = import_module('heads.' + args.head_name)

    endpoints, body_prefix = model.endpoints(images, is_training=False)
    with tf.name_scope('head'):
        endpoints = head.head(endpoints, args.embedding_dim, is_training=False)

    with h5py.File(args.filename, 'w') as f_out, tf.Session() as sess:
        # Initialize the network/load the checkpoint.
        if args.checkpoint is None:
            checkpoint = tf.train.latest_checkpoint(args.experiment_root)
        else:
            checkpoint = os.path.join(args.experiment_root, args.checkpoint)
        if not args.quiet:
            print('Restoring from checkpoint: {}'.format(checkpoint))
        tf.train.Saver().restore(sess, checkpoint)

        # Go ahead and embed the whole dataset, with all augmented versions too.
        emb_storage = np.zeros(
            (len(data_fids) * len(modifiers), args.embedding_dim), np.float32)
        for start_idx in count(step=args.batch_size):
            try:
                emb = sess.run(endpoints['emb'])
                print('\rEmbedded batch {}-{}/{}'.format(
                        start_idx, start_idx + len(emb), len(emb_storage)),
                    flush=True, end='')
                emb_storage[start_idx:start_idx + len(emb)] = emb
            except tf.errors.OutOfRangeError:
                break  # This just indicates the end of the dataset.

        print()
        if not args.quiet:
            print("Done with embedding, aggregating augmentations...", flush=True)

        if len(modifiers) > 1:
            # Pull out the augmentations into a separate first dimension.
            emb_storage = emb_storage.reshape(len(data_fids), len(modifiers), -1)
            emb_storage = emb_storage.transpose((1,0,2))  # (Aug,FID,128D)

            # Store the embedding of all individual variants too.
            emb_dataset = f_out.create_dataset('emb_aug', data=emb_storage)

            # Aggregate according to the specified parameter.
            emb_storage = AGGREGATORS[args.aggregator](emb_storage)

        # Store the final embeddings.
        emb_dataset = f_out.create_dataset('emb', data=emb_storage)

        # Store information about the produced augmentation and in case no crop
        # augmentation was used, if the images are resized or avg pooled.
        f_out.create_dataset('augmentation_types', data=np.asarray(modifiers, dtype='|S'))
     # Verify that parameters are set correctly.


    args = Namespace(batch_size=256, excluder='market1501', gallery_dataset='data/test.csv', gallery_embeddings='/home/sunrise/experiments/my_experiment/test.h5', metric='euclidean', query_dataset='data/query.csv', query_embeddings='/home/sunrise/experiments/my_experiment/query.h5')

    # Load the query and gallery data from the CSV files.
    query_pids, query_fids = data_pids,data_fids
    gallery_pids, gallery_fids = common.load_dataset(args.gallery_dataset, None)

    # Load the two datasets fully into memory.
    '''
    with h5py.File(args.query_embeddings, 'r') as f_query:
        query_embs = np.array(f_query['emb'])
    '''
    with h5py.File(args.gallery_embeddings, 'r') as f_gallery:
        gallery_embs = np.array(f_gallery['emb'])
    
    query_embs = emb_storage
    # Just a quick sanity check that both have the same embedding dimension!
    query_dim = query_embs.shape[1]
    gallery_dim = gallery_embs.shape[1]
    if query_dim != gallery_dim:
        raise ValueError('Shape mismatch between query ({}) and gallery ({}) '
                         'dimension'.format(query_dim, gallery_dim))

    # Setup the dataset specific matching function
    # excluder = i qmport_module('excluders.' + args.excluder).Excluder(gallery_fids)

    # We go through the queries in batches, but we always need the whole gallery
    batch_pids, batch_fids, batch_embs = tf.data.Dataset.from_tensor_slices(
        (query_pids, query_fids, query_embs)
    ).batch(args.batch_size).make_one_shot_iterator().get_next()

    batch_distances = loss.cdist(batch_embs, gallery_embs, metric=args.metric)

    # Loop over the query embeddings and compute their APs and the CMC curve.
    aps = []
    cmc = np.zeros(len(gallery_pids), dtype=np.int32)
    with tf.Session() as sess:
        for start_idx in count(step=args.batch_size):
            try:
                # Compute distance to all gallery embeddings
                distances, pids, fids = sess.run([
                    batch_distances, batch_pids, batch_fids])
                print('\rEvaluating batch {}-{}/{}'.format(
                        start_idx, start_idx + len(fids), len(query_fids)),
                      flush=True, end='')
            except tf.errors.OutOfRangeError:
                print()  # Done!
                break

            # Convert the array of objects back to array of strings
            pids, fids = np.array(pids, '|U'), np.array(fids, '|U')

            # Compute the pid matches
            pid_matches = gallery_pids[None] == pids[:,None]



            # Keep track of statistics. Invert distances to scores using any
            # arbitrary inversion, as long as it's monotonic and well-behaved,
            # it won't change anything.
            scores = 1 / (1 + distances)
            for i in range(len(distances)):
                ap = average_precision_score(pid_matches[i], scores[i])

                if np.isnan(ap):
                    print()
                    print("WARNING: encountered an AP of NaN!")
                    print("This usually means a person only appears once.")
                    print("In this case, it's because of {}.".format(fids[i]))
                    print("I'm excluding this person from eval and carrying on.")
                    print()
                    continue

                aps.append(ap)
                print(distances[i])
                print(np.argsort(distances[i]))
                print(gallery_fids[np.argsort(distances[i])[0]])
 

main()