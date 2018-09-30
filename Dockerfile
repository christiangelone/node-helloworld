FROM node:8-alpine

LABEL maintainer "christiangelone@gmail.com"

WORKDIR /usr/src/app
COPY . .
RUN npm install

EXPOSE 3333
CMD [ "npm", "start" ]