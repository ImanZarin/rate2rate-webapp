FROM node:12-alpine as npm-packages
WORKDIR '/app'
COPY package.json .
COPY package-lock.json .
RUN npm install
CMD ["npm","start"]
