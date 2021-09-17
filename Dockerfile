FROM node:16

RUN chmod -R 777 /home/node

USER node

WORKDIR /home/node

COPY package.json .

COPY yarn.lock .

RUN yarn

COPY . .

CMD [ "yarn", "start:dev" ]

