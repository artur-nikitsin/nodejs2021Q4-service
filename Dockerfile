FROM node:16-alpine

EXPOSE ${PORT}

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@8.3.2

RUN npm install

COPY ./ ./

CMD ["npm","run", "start"]

