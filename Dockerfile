FROM node:lts
ENV NODE_ENV=development

WORKDIR /app

COPY package.json .
RUN npm install
COPY . .
RUN npm run build

CMD [ "node", "build/src/server.js" ]
