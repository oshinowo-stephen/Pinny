FROM node:12-alpine AS builder

WORKDIR /node/src/app

COPY src .
COPY migrations .
COPY package.json .
COPY tsconfig.json .

RUN apk add --update git

RUN npm install
RUN npm run stage:build

FROM alpine

WORKDIR /pinny
COPY --from=builder /node/src/app /pinny/

# Installing node
RUN apk add --update nodejs

CMD [ "node", "dist/index.js" ]
