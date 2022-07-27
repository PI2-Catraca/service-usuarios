FROM node:16

WORKDIR /app/usuarios

COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 5000

CMD ["yarn", "start"]