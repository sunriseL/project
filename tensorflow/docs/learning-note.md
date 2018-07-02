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
