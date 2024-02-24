FROM node:18.17.1-alpine

WORKDIR /online-judge

RUN apk update && apk add g++
