FROM node:16-alpine
  
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --omit=dev

EXPOSE 3001

CMD ["NODE_ENV=production", "node", "app.js"]