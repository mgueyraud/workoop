FROM python:3

ENV PYTHONUNBUFFERED 1
RUN mkdir /app/backend
WORKDIR /app/backend
COPY . /app/backend
RUN pip install -r requirements.txt

