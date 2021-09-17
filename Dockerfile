FROM node:16

RUN chmod -R 777 /home/node

USER node

WORKDIR /home/node

COPY package.json .

COPY yarn.lock .

RUN yarn

COPY . .

EXPOSE 3535

EXPOSE 8585

CMD [ "yarn", "start" ]

