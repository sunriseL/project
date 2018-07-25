from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [
    path('choose', views.get_image),
    path('trace', views.find),
    path('test', views.test),
]
