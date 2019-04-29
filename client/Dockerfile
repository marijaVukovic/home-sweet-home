FROM node:10.15.3-jessie

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && npm rebuild node-sass

COPY . .
