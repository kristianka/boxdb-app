#!/bin/sh

# migrate database
npx prisma generate
npx prisma migrate dev --name init
npx prisma migrate deploy

exec node ./dist/app.js
