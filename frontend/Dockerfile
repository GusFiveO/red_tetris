FROM node:18.17.1-alpine3.18

RUN apk add --no-cache libc6-compat

RUN mkdir /home/node/app && chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node package*.json ./
RUN yarn install

COPY --chown=node:node . ./

CMD ["yarn", "dev"]