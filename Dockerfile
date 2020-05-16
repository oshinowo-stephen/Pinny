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

RUN apk add --update nodejs npm git

ENV NODE_ENV=production

RUN npm install
RUN npm run build

CMD [ "npm", "start" ]
