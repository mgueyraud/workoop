FROM python:3

ENV PYTHONUNBUFFERED 1
RUN mkdir /backend
WORKDIR /backend
COPY . /backend

EXPOSE 8000

RUN pip install -r requirements.txt