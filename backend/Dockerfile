FROM node:18.17.1-alpine3.18

RUN apk update
RUN apk upgrade

WORKDIR /home/node/app/backend

COPY package*.json ./

RUN yarn install

COPY . .

CMD ["sh", "-c", "yarn exec prisma generate && yarn prisma migrate deploy && yarn exec nodemon src/server.ts & yarn prisma studio"]
