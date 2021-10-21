FROM node:lts-alpine3.12 as BUILD_IMAGE

ENV NODE_ENV=production \
  CI=true \
  PORT=8080 \
  PATH=/app/node_modules/.bin:$PATH

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


# Image to deploy
FROM node:lts-alpine3.12

RUN mkdir /app
WORKDIR /app

COPY package* ./
RUN npm install --production

COPY --from=builder ./app/public ./public
COPY --from=builder ./app/dist ./dist

EXPOSE 8080
CMD ["npm", "start"]
