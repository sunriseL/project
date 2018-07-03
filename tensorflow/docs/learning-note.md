# learning-note
## day1 7.2
---
搜索到谷歌官方models中的object_detection api，打算先行采用此api尝试
### 进度
---
环境配置：
   - git clone models仓库
   - 使用protoc编译proto文件
   > \# From tensorflow/models/research/
   > protoc object_detection/protos/*.proto  --python_out=.
   - 测试是否成功安装
   > python object_detection/builders/model_builder_test.py

   - demo运行成功，尝试使用不同图片识别

运行优化
  - 默认配置中图片大小过小以及label字体过小，通过调整IMAGE_SIZE以及


### 踩坑与出坑
---
1. protoc 编译时出现"expected...."字段错误

  解决方法：protoc版本为2.6,不支持此字段，将protoc换为3.6.0后问题解决。但后面出现别的问题，怀疑是protoc版本过高，正在处理。


2. 在jupyter-notebook中import tensorflow时报错
> ImportError: libcusolver.so.8.0: cannot open shared object file: No such file or directory

  解决方法：安装cuda8.0 toolkit，安装完后在bash中可以正常导入tensorflow，但在jupyter-notebook仍然报错。

3. 在运行test脚本导入proto文件夹中py文件时出现
    > TypeError: \__new__() got an unexpected keyword argument 'serialized_options'

    解决方法：猜测可能为protoc版本过高api变化编译出的py文件有兼容性问题，尝试安装低版本protoc。将protoc版本换为3.3.0后解决

---
## day2

---

尝试使用object_detection将人物图像从视频中截取出来，并且使用他人的reid问题的模型

---

### 模型尝试
- [Open-ReID](https://github.com/Cysu/open-reid)
  环境已配置好，由于没有提供预训练的模型，从头开始训练过于耗费时间，暂时不进行下去

- [person-reid-tripet-loss-baseline](https://github.com/huanghoujing/person-reid-triplet-loss-baseline)
  同上

- [tripet-reid](https://github.com/VisualComputingInstitute/triplet-reid)
  带有预训练好的模型，尝试运行成功，但是效率极低，可能是由于没有进行gpu优化，尝试安装cudnn后再尝试，以及不明白输出的参数的含义
