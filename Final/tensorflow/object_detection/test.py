import func
import base64
import io
#import bytes
from PIL import Image
def test_identify():
    with open("2.jpg","rb")  as f:
        raw = f.read()
    #stream = io.BytesIO(raw)
    #b64 = base64.b64encode(raw)
    result = func.identify_person(raw)
    #img = Image.open(stream)
    #imgByteArr = io.BytesIO()
    #result[0].save(imgByteArr, format='PNG')
    #imgByteArr = imgByteArr.getvalue()
    with open("1.jpg","wb") as f:
        f.write(result[0])
    #print(bytes.decode(base64.b64encode(result[0])))
    #print(b64)
test_identify()
