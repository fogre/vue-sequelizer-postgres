# BUILD STAGE
FROM node:14.17-buster-slim AS build-stage

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm ci

COPY . /usr/src/app/

RUN ls -l

RUN npm run build


#Serve
FROM node:14.17-buster-slim

EXPOSE 3000

COPY --from=build-stage /usr/src/app/dist /usr/share/serve

RUN npm install -g serve

CMD ["serve", "-s", "/usr/share/serve", "-p", "3000"]