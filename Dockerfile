FROM node:8-alpine

LABEL maintainer "christiangelone@gmail.com"

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3333
CMD [ "npm", "start" ]