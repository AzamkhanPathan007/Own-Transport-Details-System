FROM node:22.14.0-alpine AS builder

WORKDIR /app

COPY package.json .

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN npm install -g @nestjs/cli@latest

RUN npm install

COPY . .

RUN npm run build

FROM node:22.14.0-alpine AS app

WORKDIR /app

RUN apk add --no-cache chromium

COPY --from=builder app/public public
COPY --from=builder app/views views
COPY --from=builder app/.env.prod .env
COPY --from=builder app/package*.json .
COPY --from=builder app/dist dist
COPY --from=builder app/node_modules node_modules

EXPOSE 3000

ENTRYPOINT ["node", "main"]