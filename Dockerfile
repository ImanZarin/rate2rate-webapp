FROM node:alpine
WORKDIR '/rate2rate-webapp'
COPY package.json .
RUN npm install
COPY . .
CMD ["npm","start"]
