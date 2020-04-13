FROM node:12-alpine AS builder

WORKDIR /node/src/app

COPY src ./src
COPY migrations ./migrations
COPY knexfile.js .
COPY package.json .
COPY tsconfig.json .

RUN apk add --update git

RUN npm install
RUN npm run stage:build

CMD [ "npm", "run stage:start" ]
