FROM node:18.17.1-alpine3.18

RUN apk update
RUN apk upgrade

COPY ./ ./

RUN yarn

EXPOSE 3000

ENTRYPOINT node index.js