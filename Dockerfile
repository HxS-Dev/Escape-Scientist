FROM node:lts-alpine
WORKDIR /app
COPY . /app
RUN npm install
CMD ["npm", "start"]