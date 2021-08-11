FROM node:lts-alpine
WORKDIR /app
COPY hxs /app
RUN npm install
CMD ["npm", "start"]