FROM node:fermium

RUN mkdir /frontend
COPY . /frontend

COPY package.json /frontend/package.json
RUN cd /frontend; yarn install

EXPOSE 3000

WORKDIR /frontend