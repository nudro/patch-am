#!/bin/bash

echo "Starting Adversarial Trajectory Animation Setup"
echo "=============================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is required but not installed."
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "Installing dependencies..."
npm install

echo ""
echo "Starting development server..."
echo "The application will open in your default browser."
echo "Press Ctrl+C to stop the server."
echo ""

npm start 