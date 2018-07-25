import os
import csv
import random

















def main(video_name="3.mp4",image_root="object_detection/test_image",query_num=50,csv_path='triplet_reid/data'):
    files = os.walk(image_root)
    for f in files:
        if f[0] == image_root:
            image_names = f[2]
    #print(image_names)
    query_filename = video_name.replace('.','_') + '_query.csv'
    gallery_filename = video_name.replace('.','_') + '_gallery.csv'
    pid = 1
    #image_root = '../' + image_root
    with open(os.path.join(csv_path,gallery_filename),'w') as f_gallery:
        writer = csv.writer(f_gallery)
        for image in image_names:
            writer.writerow([str(pid),os.path.join(image_root,image)])
            #print([(str(pid),os.path.join(image_root,image)),])
   
    query = random.sample(image_names,query_num)
    with open(os.path.join(csv_path,query_filename),'w') as f_query:
        writer = csv.writer(f_query)
        for image in query:
            writer.writerow([str(pid),os.path.join(image_root,image)])
            #print([(str(pid),os.path.join(image_root,image)),])

main()
