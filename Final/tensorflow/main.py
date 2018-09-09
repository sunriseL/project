import os
import sys
import csv
ABSPATH = os.path.abspath(os.path.realpath(os.path.dirname(__file__)))
sys.path.append('.')
#os.chdir(os.path.join(os.getcwd(),"triplet_reid"))
import triplet_reid
from triplet_reid.embed_func import embed,embed_single_image
from triplet_reid.evaluate_func import evaluate,evaluate_single_image
from triplet_reid import single_image
from object_detection.func import identify_person_from_video
with open('/home/sunrise/project/tensorflow/object_detection/test_image/0-0.jpg','rb') as f:
    #emb = embed_single_image(image=f.read(),dataset='data/query_.csv',filename="query_.h5")
    print(single_image.get_data(f.read()))

#embed(dataset='data/3_mp4_gallery.csv',filename="3_mp4_gallery.h5",image_root='..')
#data = evaluate_single_image(emb,gallery_dataset="data/gallery_.csv",gallery_embeddings='/home/sunrise/experiments/my_experiment/gallery_.h5')
#data = evaluate(gallery_dataset="data/gallery_.csv",query_dataset="data/query_.csv",gallery_embeddings='/home/sunrise/experiments/my_experiment/gallery_.h5',query_embeddings='/home/sunrise/experiments/my_experiment/query_.h5')
#data = embed()
#for i in data:
#    print(len(i))
#print(len(data))
#print()
#print(data)
#print(len(data[0]))
#print("ok")
#print(os.getcwd())
#result = identify_person_from_video(dir="object_detection",file_name="123.csv")
#print('after return')
#print(result)
#with open('triplet_reid/data/query_.csv','w') as f:
#    writer = csv.writer(f)
#    writer.writerows(result)
