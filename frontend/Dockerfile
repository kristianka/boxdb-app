# build stage
FROM node:22.1.0-alpine AS build

WORKDIR /usr/src/app

COPY . .

# Overwrite any .env file with the contents of .docker.env
COPY .docker.env .env

RUN npm install && \
    npm run build

RUN npm install -g serve

CMD ["serve", "-s", "dist", "-l", "5173"]
