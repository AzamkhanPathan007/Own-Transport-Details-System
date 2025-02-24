# Stage-1
FROM node:22.14.0-alpine AS builder

WORKDIR /app

COPY package.json ./

RUN npm install -g npm@latest
RUN npm install -g @nestjs/cli@latest
RUN npm install

COPY . .

RUN npm run build

# Stage-2
FROM node:22.14.0-alpine AS app

WORKDIR /app

RUN apk add --no-cache chromium

COPY --from=builder app/public public
COPY --from=builder app/views views
COPY --from=builder app/package*.json ./
COPY --from=builder app/dist dist
COPY --from=builder app/node_modules node_modules

EXPOSE 3000

CMD ["npm", "run", "start:prod"]