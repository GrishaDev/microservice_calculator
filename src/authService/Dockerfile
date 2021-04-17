FROM node:10

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 6200
CMD [ "npm", "start" ]