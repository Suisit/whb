import cv2
import torch
import torch.nn.init as init
import numpy as np
import torch.nn as nn
import torch.nn.functional as F
import torchvision
import torchvision.transforms as transforms
from torch.utils.data import DataLoader
from torchvision import models
import matplotlib.pyplot as plt
import torch.optim as optim
from PIL import Image
import numpy as np
font = cv2.FONT_HERSHEY_SIMPLEX
model = torch.load('res50model.pkl')
with torch.no_grad():
      model.eval()
val_class = ['Congratulation','Eight','Fist','Five','Four','Heart_1','Heart_2','Heart_3',
       'Heart_single','Honour','ILY','Insult','Nine','OK','One','Palm_up','Prayer',
       'Rock','Seven','Six','Three','Thumb_down','Thumb_up','Two']
cap = cv2.VideoCapture(0)# 摄像头，0是笔记本自带摄像头
train_transforms = transforms.Compose([
        transforms.Resize(480,272),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])
while(cap.isOpened()):
    ret, frame = cap.read()
    frame2 = frame[:,::-1,:]#水平翻转，符合自拍习惯
    frame2= frame2.copy()

    frame2 = Image.fromarray(frame2)
    img = train_transforms(frame2)
    img = img.reshape(1, 3, 224, 224)
    out = model(img)
    x=np.array(val_class)[out.argmax(dim=1).detach().numpy()]
    print(type(frame))
    cv2.putText(frame, str(x), (1, 100), font, 0.55, (0, 255, 0), 2)
    cv2.imshow('im', frame)
    if cv2.waitKey(10) & 0xFF == ord('q'):
        break
cap.release()
cv2.destroyAllWindows()