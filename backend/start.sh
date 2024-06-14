#!/bin/sh

# Wait for 30 seconds to ensure the database is ready
echo "Waiting for 30 seconds to ensure the database is ready..."
sleep 30

# migrate database
npx prisma generate
npx prisma migrate dev --name init
npx prisma migrate deploy

exec node ./dist/app.js
