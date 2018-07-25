#coding:utf-8
import numpy as np
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
import six.moves.urllib as urllib
import sys
import tarfile
import tensorflow as tf
import zipfile

from collections import defaultdict
from io import StringIO
from matplotlib import pyplot as plt
from PIL import Image

## This is needed to display the images.
#%matplotlib inline

# This is needed since the notebook is stored in the object_detection folder.
sys.path.append("..")

from object_detection.utils import label_map_util

from object_detection.utils import visualization_utils as vis_util

# What model to download.
MODEL_NAME = 'ssd_mobilenet_v1_coco_11_06_2017'
MODEL_FILE = MODEL_NAME + '.tar.gz'
DOWNLOAD_BASE = 'http://download.tensorflow.org/models/object_detection/'

# Path to frozen detection graph. This is the actual model that is used for the object detection.
PATH_TO_CKPT = MODEL_NAME + '/frozen_inference_graph.pb'

# List of the strings that is used to add correct label for each box.
PATH_TO_LABELS = os.path.join('data', 'mscoco_label_map.pbtxt')

NUM_CLASSES = 90

#download model
opener = urllib.request.URLopener()
#下载模型，如果已经下载好了下面这句代码可以注释掉
#opener.retrieve(DOWNLOAD_BASE + MODEL_FILE, MODEL_FILE)
tar_file = tarfile.open(MODEL_FILE)
for file in tar_file.getmembers():
  file_name = os.path.basename(file.name)
  if 'frozen_inference_graph.pb' in file_name:
    tar_file.extract(file, os.getcwd())

#Load a (frozen) Tensorflow model into memory.
detection_graph = tf.Graph()
with detection_graph.as_default():
  od_graph_def = tf.GraphDef()
  with tf.gfile.GFile(PATH_TO_CKPT, 'rb') as fid:
    serialized_graph = fid.read()
    od_graph_def.ParseFromString(serialized_graph)
    tf.import_graph_def(od_graph_def, name='')
#Loading label map
label_map = label_map_util.load_labelmap(PATH_TO_LABELS)
categories = label_map_util.convert_label_map_to_categories(label_map, max_num_classes=NUM_CLASSES, use_display_name=True)
category_index = label_map_util.create_category_index(categories)
#print category_index
#Helper code
def load_image_into_numpy_array(image):
  (im_width, im_height) = image.size
  return np.array(image.getdata()).reshape(
      (im_height, im_width, 3)).astype(np.uint8)


# For the sake of simplicity we will use only 2 images:
# image1.jpg
# image2.jpg
# If you want to test the code with your images, just add path to the images to the TEST_IMAGE_PATHS.
PATH_TO_TEST_IMAGES_DIR = 'test_images'
TEST_IMAGE_PATHS = [ os.path.join(PATH_TO_TEST_IMAGES_DIR, 'image{}.jpg'.format(i)) for i in range(1, 4) ]

# Size, in inches, of the output images.
IMAGE_SIZE = (12, 8)

import cv2
import time
'''
with detection_graph.as_default():
  with tf.Session(graph=detection_graph) as sess:
    for image_path in TEST_IMAGE_PATHS:
      image = Image.open(image_path)
      # the array based representation of the image will be used later in order to prepare the
      # result image with boxes and labels on it.
      image_np = load_image_into_numpy_array(image)
      # Expand dimensions since the model expects images to have shape: [1, None, None, 3]
      image_np_expanded = np.expand_dims(image_np, axis=0)
      image_tensor = detection_graph.get_tensor_by_name('image_tensor:0')
      # Each box represents a part of the image where a particular object was detected.
      boxes = detection_graph.get_tensor_by_name('detection_boxes:0')
      # Each score represent how level of confidence for each of the objects.
      # Score is shown on the result image, together with the class label.
      scores = detection_graph.get_tensor_by_name('detection_scores:0')
      classes = detection_graph.get_tensor_by_name('detection_classes:0')
      num_detections = detection_graph.get_tensor_by_name('num_detections:0')

      print boxes
      print scores
      print classes
      print num_detections
      # Actual detection.
      (boxes, scores, classes, num_detections) = sess.run(
          [boxes, scores, classes, num_detections],
          feed_dict={image_tensor: image_np_expanded})
      # Visualization of the results of a detection.
      print len(boxes[0]),len(scores[0]),len(classes[0])
      print boxes
      print scores
      print classes
      print num_detections
      vis_util.visualize_boxes_and_labels_on_image_array(
          image_np,
          np.squeeze(boxes),
          np.squeeze(classes).astype(np.int32),
          np.squeeze(scores),
          category_index,
          use_normalized_coordinates=True,
          line_thickness=8)
      plt.figure(figsize=IMAGE_SIZE)
      plt.imshow(image_np)
      plt.show()
      print "picture"
'''
video_name = "4.mp4"
cap = cv2.VideoCapture(video_name)
with detection_graph.as_default():
     with tf.Session(graph=detection_graph) as sess:
           i = 0
           while (1):
              start = time.clock()
              # 按帧读视
              ret, frame = cap.read()
              #print(cap.get(0),cap.get(1),cap.get(2))
              if cv2.waitKey(1) & 0xFF == ord('q'):
                 break
              image_np = frame
              height = len(image_np)
              width = len(image_np[0])
              #print height, width
              #if i % 4 != 0:
              #    i += 1
              #    continue
              image_np_expanded = np.expand_dims(image_np, axis=0)
              image_tensor = detection_graph.get_tensor_by_name('image_tensor:0')
              boxes = detection_graph.get_tensor_by_name('detection_boxes:0')
              scores = detection_graph.get_tensor_by_name('detection_scores:0')
              classes = detection_graph.get_tensor_by_name('detection_classes:0')
              num_detections = detection_graph.get_tensor_by_name('num_detections:0')
              # Actual detection.
              (boxes, scores, classes, num_detections) = sess.run(
                [boxes, scores, classes, num_detections],
                feed_dict={image_tensor: image_np_expanded})
              ymin, xmin, ymax, xmax = boxes[0][0]
              ymin = int(ymin * height)
              xmin = int(xmin * width)
              ymax = int(ymax * height)
              xmax = int(xmax * width)
              #print xmin,ymin,xmax,ymax
              j = 0
              #print scores
              #print category_index
              for index in range(len(boxes[0])):
                  if scores[0][index] > 0.5:
                      class_name = category_index[classes[0][index]]['name']
                      #print class_name
                      if class_name == 'person':
                          ymin, xmin, ymax, xmax = boxes[0][index]
                          ymin = int(ymin * height)
                          xmin = int(xmin * width)
                          ymax = int(ymax * height)
                          xmax = int(xmax * width)
                          out_image = image_np[ymin:ymax, xmin:xmax]
                          cv2.imwrite('test_image/' + video_name.replace('.','_') + '-' + str(int(cap.get(0))) + '-' + str(j) + '.jpg',out_image)
                          j += 1
              # print boxes
              # vis_util.visualize_boxes_and_labels_on_image_array(
              #     image_np,
              #     np.squeeze(boxes),
              #     np.squeeze(classes).astype(np.int32),
              #     np.squeeze(scores),
              #    category_index,
              #    use_normalized_coordinates=True,
              #    line_thickness=8)
              #a = input()
              out_image = image_np[ymin:ymax, xmin:xmax]
              end = time.clock()
              #print('frame:', 1.0 / (end - start))
              #cv2.imwrite('test_image/' + str(i) + '.jpg',out_image)
              i += 1
              cv2.imshow("capture", image_np)
              # cv2.imshow("capture1", out_image)
              cv2.waitKey(1)

# 释放捕捉的对象和内存
cap.release()
cv2.destroyAllWindows()
