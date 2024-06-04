ARG NODE_VERSION=18.17.1

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev"]