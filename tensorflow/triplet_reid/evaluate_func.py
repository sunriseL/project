#!/usr/bin/env python3
from argparse import ArgumentParser, FileType,Namespace
from importlib import import_module
from itertools import count
import os

import h5py
import json
import numpy as np
from sklearn.metrics import average_precision_score
import tensorflow as tf

import common
import loss



def evaluate(gallery_dataset='data/test.csv'):
    # Verify that parameters are set correctly.
    args = Namespace(batch_size=256, excluder='market1501', gallery_dataset='data/test.csv', gallery_embeddings='/home/sunrise/experiments/my_experiment/test.h5', metric='euclidean', query_dataset='data/query.csv', query_embeddings='/home/sunrise/experiments/my_experiment/query.h5')

    # Load the query and gallery data from the CSV files.
    query_pids, query_fids = common.load_dataset(args.query_dataset, None)
    gallery_pids, gallery_fids = common.load_dataset(args.gallery_dataset, None)

    # Load the two datasets fully into memory.
    with h5py.File(args.query_embeddings, 'r') as f_query:
        query_embs = np.array(f_query['emb'])
    with h5py.File(args.gallery_embeddings, 'r') as f_gallery:
        gallery_embs = np.array(f_gallery['emb'])

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
            #print(batch_pids)
            #print(batch_fids)
            # Convert the array of objects back to array of strings
            pids, fids = np.array(pids, '|U'), np.array(fids, '|U')
            #print(pids)
            #print(fids)
            # Compute the pid matches
            pid_matches = gallery_pids[None] == pids[:,None]
            # print(pid_matches)


            # Keep track of statistics. Invert distances to scores using any
            # arbitrary inversion, as long as it's monotonic and well-behaved,
            # it won't change anything.
            scores = 1 / (1 + distances)
            #print(distances)
            #print(pid_matches)
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
 
                # Find the first true match and increment the cmc data from there on.
                k = np.where(pid_matches[i, np.argsort(distances[i])])[0][0]
                cmc[k:] += 1

    # Compute the actual cmc and mAP values
    cmc = cmc / len(query_pids)
    mean_ap = np.mean(aps)


    # Print out a short summary.
    # print('mAP: {:.2%} | top-1: {:.2%} top-2: {:.2%} | top-5: {:.2%} | top-10: {:.2%}'.format(
    #     mean_ap, cmc[0], cmc[1], cmc[4], cmc[9]))

if __name__ == '__main__':
    main()
