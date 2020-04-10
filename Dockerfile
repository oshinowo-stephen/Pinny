FROM node:13-alpine3.10 AS builder

WORKDIR /node/src/app

COPY src .
COPY migrations .
COPY package.json .

RUN npm install
RUN npm run build

RUN alpine

WORKDIR /pinny
COPY --from=builder /node/src/app /pinny/

# Installing node
RUN apk add --update nodejs

CMD [ "node", "dist/index.js" ]
