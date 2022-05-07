FROM node:16.15.0-alpine3.15

WORKDIR /usr/src/app

RUN npm install express
RUN npm install body-parser
RUN npm install express-form-data
RUN npm install redis
COPY src src

CMD ["node", "./src/server.js"]
