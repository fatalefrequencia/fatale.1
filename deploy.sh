#!/bin/bash

# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install required global packages
sudo npm install -g pm2 serve

# Create app directory
mkdir -p /var/www/fatale-fm
cd /var/www/fatale-fm

# Copy application files
# Note: You'll need to upload your files to the VM first

# Install dependencies
npm install

# Build the application
npm run build

# Start the application with PM2
pm2 start ecosystem.config.js

# Save PM2 process list and configure to start on system startup
pm2 save
pm2 startup