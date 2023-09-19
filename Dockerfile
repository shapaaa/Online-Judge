FROM node:18.17.1-alpine

WORKDIR /online-judge

RUN apk update && apk add g++

COPY package.json .
RUN npm install
COPY ./src/app/api/run ./src/app/api/run
COPY ./src/app/services/executeCpp.js ./src/app/services/executeCpp.js

CMD [ "npm", "run", "dev" ]