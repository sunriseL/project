import os
from triplet_reid.embed_func import embed_single_image
from triplet_reid.evaluate_func import evaluate_single_image


def image_to_xy(data_list):
    result = []
    for data in sorted(data_list,key=lambda k:k[1],reverse=False):
        result.append( (data[1], (eval(data[2]) + eval(data[3]) )/2, data[5]))
    return result

def get_data(image):
    path = os.getcwd()
    os.chdir('/home/sunrise/project/tensorflow/triplet_reid')
    emb = embed_single_image(image=image)
    data = evaluate_single_image(emb,gallery_dataset="data/gallery_.csv",
        gallery_embeddings='/home/sunrise/experiments/my_experiment/gallery_.h5')
    #print(data)
    os.chdir(path)
    return image_to_xy(data[0])
