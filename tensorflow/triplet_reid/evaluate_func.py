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

from triplet_reid import common
from triplet_reid import loss

MAX_DIFF = 9
MAX_NUM = 50

def evaluate(gallery_dataset='data/test.csv', gallery_embeddings='/home/sunrise/experiments/my_experiment/test.h5',query_dataset='data/query.csv', query_embeddings='/home/sunrise/experiments/my_experiment/query.h5'):
    # Verify that parameters are set correctly.
    args = Namespace(batch_size=256, excluder='market1501', gallery_dataset=gallery_dataset, gallery_embeddings=gallery_embeddings, metric='euclidean', query_dataset=query_dataset, query_embeddings=query_embeddings)

    # Load the query and gallery data from the CSV files.
    query_pids, query_fids,_,_,_,_,_ = common.load_dataset(args.query_dataset, None)
    gallery_data = common.load_dataset(args.gallery_dataset, None)
    gallery_pids = gallery_data[0]
    gallery_fids = gallery_data[1]
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

            # Convert the array of objects back to array of strings
            pids, fids = np.array(pids, '|U'), np.array(fids, '|U')

            # Compute the pid matches
            pid_matches = gallery_pids[None] == pids[:,None]
            # print(pid_matches)


            # Keep track of statistics. Invert distances to scores using any
            # arbitrary inversion, as long as it's monotonic and well-behaved,
            # it won't change anything.
            scores = 1 / (1 + distances)
            #print(distances)
            #print(pid_matches)
            final_result = []
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

                result = []
                #print(distances[i])
                #print(np.argsort(distances[i]))

                #print(gallery_fids[np.argsort(distances[i])[0]])
                for index in np.argsort(distances[i]):
                    if(distances[i][index] > MAX_DIFF):
                        break
                    result.append((gallery_fids[index],gallery_data[2][index],gallery_data[3][index],gallery_data[4][index],
                        gallery_data[5][index],gallery_data[6][index]))
                #return result
                final_result.append(result)
            return final_result


def evaluate_single_image(emb,gallery_dataset='data/test.csv', gallery_embeddings='/home/sunrise/experiments/my_experiment/test.h5',query_dataset='data/query.csv', query_embeddings='/home/sunrise/experiments/my_experiment/query.h5'):
    # Verify that parameters are set correctly.
    args = Namespace(batch_size=256, excluder='market1501', gallery_dataset=gallery_dataset, gallery_embeddings=gallery_embeddings, metric='euclidean', query_dataset=query_dataset, query_embeddings=query_embeddings)

    # Load the query and gallery data from the CSV files.
    #query_pids, query_fids,_,_,_,_,_ = common.load_dataset(args.query_dataset, None)
    gallery_data = common.load_dataset(args.gallery_dataset, None)
    gallery_pids = gallery_data[0]
    gallery_fids = gallery_data[1]
    # Load the two datasets fully into memory.
    #with h5py.File(args.query_embeddings, 'r') as f_query:
    #    query_embs = np.array(f_query['emb'])
    with h5py.File(args.gallery_embeddings, 'r') as f_gallery:
        gallery_embs = np.array(f_gallery['emb'])
    query_embs = emb
    query_pids = ['1']
    query_fids = ['1.jpg']
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
            # print(pid_matches)


            # Keep track of statistics. Invert distances to scores using any
            # arbitrary inversion, as long as it's monotonic and well-behaved,
            # it won't change anything.
            scores = 1 / (1 + distances)
            #print(distances)
            #print(pid_matches)
            final_result = []
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

                result = []
                #print(distances[i])
                #print(np.argsort(distances[i]))

                #print(gallery_fids[np.argsort(distances[i])[0]])
                for index in np.argsort(distances[i]):
                    if(distances[i][index] > MAX_DIFF):
                        break
                    result.append((gallery_fids[index],gallery_data[2][index],gallery_data[3][index],gallery_data[4][index],
                        gallery_data[5][index],gallery_data[6][index]))
                #return result
                final_result.append(result)
            return final_result
