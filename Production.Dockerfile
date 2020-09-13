FROM node:12-alpine as npm-packages
WORKDIR '/app'
COPY package.json .
COPY package-lock.json .
RUN npm install

FROM npm-packages as build
COPY . .
COPY ./.production.ignore.env ./.env
RUN npm run build
RUN npm install -g serve

# production environment
FROM build
EXPOSE 80
CMD ["serve","-s","build","-l","80"]
