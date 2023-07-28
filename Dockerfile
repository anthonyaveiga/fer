FROM python:3.8.13-slim-bullseye

WORKDIR /app

RUN apt-get -y update && apt-get install -y \
  wget \
  ffmpeg \ 
  libsm6 \
  libxext6

RUN pip install --upgrade setuptools 

COPY requirements.txt .

RUN pip install -r requirements.txt

ADD . . 

CMD python emotion_detection.py --model output/model-CK3.pth --prototxt model/deploy.prototxt.txt --caffemodel model/res10_300x300_ssd_iter_140000_fp16.caffemodel