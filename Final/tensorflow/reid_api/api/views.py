from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
# Create your views here.
from django.views.decorators.csrf import csrf_exempt
import cv2
import base64
import numpy as np
import json
import sys
sys.path.append("..")

from object_detection import func
from triplet_reid import evaluate_func,single_image
@csrf_exempt
def get_image(request):
    if request.method == "GET":
        return HttpResponse("get base64 image!")
    if request.method == "POST":
        data = request.POST
        #if len(data.lists()) == 0:
        data = json.loads(request.body.decode("utf-8"))
        #print(data)
        imgStream = data["imgStream"]
        header = imgStream[:imgStream.find(',') + 1].replace('JPG',"PNG")
        imgStream = imgStream[imgStream.find(',') + 1:]
        img = base64.b64decode(imgStream)
        #file = open("1.png","wb")
        result = func.identify_person(img)
        i = 2
        pictures=[]
        for image in result:
            #with open(str(i)+".png","wb") as f:
            pictures.append({
                'data':header + bytes.decode(base64.b64encode(image)),
            })
            #i += 1
        #file.write(img)
        #file.close()
        #img = cv2.imdecode(np.fromstring(img, np.uint8),cv2.IMREAD_COLOR )
        #cv2.imshow("123",img)
        #return HttpResponse("not json")
        ret = {
        'pictures':pictures,
        }
        return JsonResponse(ret, content_type="json")

@csrf_exempt
def test(request):
    if request.method == "GET":
        return HttpResponse("get success")
    if request.method == "POST":
        print(request.body)
        print(request.POST)
        data = json.loads(request.body.decode("utf-8"))
        print(data)
        return HttpResponse("body is " + str(request.body) + '\n' + "POST is" + json.dumps(data))

@csrf_exempt
def find(request):
    if request.method == "GET":
        return HttpResponse("not a POST method")
    if request.method == "POST":
        data = request.POST
        #if len(data.lists()) == 0:
        data = json.loads(request.body.decode("utf-8"))
        imgStream = data["imgStream"]
        header = imgStream[:imgStream.find(',') + 1].replace('JPG',"PNG")
        imgStream = imgStream[imgStream.find(',') + 1:]
        img = base64.b64decode(imgStream)

        xy_list = single_image.get_data(img)
        result = []
        for xy in xy_list:
            result.append({'cameraid':1,'relative_time':xy[0],'x':xy[1],'y':xy[2]})
        ret = [
            {'cameraid':1,'x':0.5,'y':0.50},
            {'cameraid':1,'x':0.45,'y':0.5},
            {'cameraid':1,'x':0.4,'y':0.51},
            {'cameraid':1,'x':0.38,'y':0.48},
            {'cameraid':1,'x':0.35,'y':0.45},
            ]
        return JsonResponse({'data':result},content_type='')
