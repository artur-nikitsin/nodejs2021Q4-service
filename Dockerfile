FROM node:16-alpine

EXPOSE 4000

WORKDIR /usr/app/src

COPY package*.json .

RUN yarn install

COPY . .

CMD ["yarn", "start"]


