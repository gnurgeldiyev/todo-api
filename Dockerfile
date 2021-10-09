FROM node:14

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY src ./src
COPY tsconfig.json ./tsconfig.json
COPY .env ./

RUN yarn build

CMD ["yarn", "start"]