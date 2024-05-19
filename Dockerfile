FROM node:18-bullseye

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install -g npm@10.6.0

EXPOSE 3000

COPY . .

CMD [ "npm", "start" ]