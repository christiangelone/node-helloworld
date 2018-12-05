FROM node:8-alpine
LABEL maintainer "christiangelone@gmail.com"

ENV NODE_ENV "development"
WORKDIR /app

COPY . /app
RUN npm install

EXPOSE 3333
CMD [ "npm", "run prod" ]