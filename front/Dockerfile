FROM node:16.15.0-alpine3.15

WORKDIR /usr/src/app

RUN npm install express

COPY src src

CMD ["node", "./src/server.js"]
