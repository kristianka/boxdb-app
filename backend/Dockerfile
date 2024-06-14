# build stage
FROM node:22.1.0-alpine AS build

WORKDIR /usr/src/app

COPY . .

# Overwrite any .env file with the contents of .docker.env
COPY .docker.env .env

# install dependencies
RUN npm install && \
    npm run build

# run stage
FROM node:22.1.0-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy built application and node_modules from the build stage
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/prisma ./prisma
COPY --from=build /usr/src/app/node_modules ./node_modules

# Copy the start.sh script and make it executable
COPY --from=build /usr/src/app/start.sh ./start.sh
RUN chmod +x start.sh

# change user for security
RUN adduser -D appuser && \
    chown -R appuser:appuser /usr/src/app
USER appuser

# init database and start backend
ENTRYPOINT ["./start.sh"]