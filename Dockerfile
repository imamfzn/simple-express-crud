FROM node:14.15-alpine

COPY . ./

RUN apk add curl && npm install

EXPOSE 5000

CMD [ "npm", "start" ]
