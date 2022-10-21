
FROM node:16.18.0-alpine3.15

LABEL author="Anh Dung"

WORKDIR /var/app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "serve" ]