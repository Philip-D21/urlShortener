# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /app
COPY . /app
RUN npm install 
EXPOSE 4400
CMD node app.js


