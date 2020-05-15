FROM node:12-alpine AS builder

WORKDIR /usr/app/pinny

COPY src/ .
COPY migrations/ . 
COPY knexfile.js .
COPY package.json .
COPY tsconfig.json .

FROM alpine

WORKDIR /usr/app/pinny

RUN apk add --update nodejs npm git

RUN npm install
RUN npm run stage:build

CMD [ "npm", "start" ]
