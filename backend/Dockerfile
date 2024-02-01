FROM node:18.17.1-alpine3.18

RUN apk update
RUN apk upgrade

COPY ./ /home/node/app/backend/

WORKDIR /home/node/app/backend/

RUN yarn install

EXPOSE 5000

ENTRYPOINT node index.js