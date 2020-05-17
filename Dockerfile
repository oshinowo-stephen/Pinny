FROM node:12-alpine AS builder

WORKDIR /usr/app/pinny

COPY src/ ./src
COPY migrations/ ./migrations
COPY knexfile.js .
COPY package.json .
COPY tsconfig.json .

FROM alpine

WORKDIR /pinny

COPY --from=builder /usr/app/pinny/ /pinny/

RUN apk add nodejs npm git 

RUN npm install

CMD [ "npm", "start" ]
