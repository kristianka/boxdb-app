# build stage
FROM node:22.1.0-alpine AS build

WORKDIR /usr/src/app

COPY . .

# Overwrite any .env file with the contents of .docker.env
COPY .docker.env .env

# install dependencies and
# regenate database schema
RUN npm install && \
    npx prisma generate && \
    npx prisma migrate dev --name init && \
    npx prisma migrate deploy && \
    npm run build


# run stage
FROM node:22.1.0-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy built application and node_modules from the build stage
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

# change user for security
RUN adduser -D appuser
USER appuser

CMD ["node", "./dist/app.js"]
