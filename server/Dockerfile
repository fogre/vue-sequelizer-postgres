FROM node:lts-alpine

RUN apk add dumb-init

ENV NODE_ENV production
  
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --only=production

USER node

EXPOSE 3001

CMD ["dumb-init", "node", "app.js"]