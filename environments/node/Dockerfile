FROM node:19

WORKDIR /site

COPY * /site

RUN npm install

EXPOSE 8080

CMD [ "node", "server.js" ]
