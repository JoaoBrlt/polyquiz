#!/bin/sh

# Run migrations and seeds.
npx sequelize db:migrate:undo:all
npx sequelize db:migrate
npx sequelize db:seed:all

# Run the server.
npm run dev
