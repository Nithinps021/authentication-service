FROM node:14.16-buster-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run test
EXPOSE 8080/tcp
CMD npm run ${type}
