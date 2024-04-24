#!/bin/bash

# Navigate to the serverjs directory and install server dependencies
echo "Installing server dependencies..."
cd serverjs
npm install

# Initialize Prisma and apply migrations
echo "Setting up Prisma..."
npx prisma init
npx prisma generate
npx prisma migrate deploy

# Navigate to the client/front directory and install client dependencies
echo "Installing client/front dependencies..."
cd ../client/front
npm install

# Go back to the root directory
cd ../../

echo "Installation complete."
