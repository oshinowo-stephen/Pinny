FROM node:12-alpine AS builder

WORKDIR /node/src/app

COPY src ./src
COPY migrations ./migrations
COPY knexfile.js .
COPY package.json .
COPY tsconfig.json .

RUN apk add --update git

ENV DB_CLIENT "postgres"

RUN npm install
RUN npm run stage:build
RUN npm run stage:migrate

FROM alpine

WORKDIR /pinny
COPY --from=builder /node/src/app /pinny/

# Installing node
RUN apk add --update nodejs

CMD [ "node", "dist/index.js" ]
