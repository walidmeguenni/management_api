#!/bin/bash
# Wait for Postgres to be ready
echo "Waiting for Postgres..."
sleep 10

# Run migrations
echo "Running migrations..."
npx prisma migrate dev --name "init"

# Run seeds
echo "Running seeds..."
npm run seed

# build the application
echo "building the application..."
npm run build

# Start the application in production mode
echo "Starting the application..."
npm run start:prod