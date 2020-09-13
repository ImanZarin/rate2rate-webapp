FROM node:12-alpine as npm-packages
WORKDIR '/app'
COPY package.json .
COPY package-lock.json .
RUN npm install

FROM npm-packages as build
COPY . .
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]