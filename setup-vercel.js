// Script to configure Vercel deployment
const fs = require('fs');
const path = require('path');

// Create Vercel configuration file
const vercelConfig = {
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/next",
      "config": {
        "buildCommand": "npm run build",
        "installCommand": "npm install"
      }
    }
  ],
  "routes": [
    // Special handling for API routes
    {
      "src": "/api/(.*)",
      "dest": "/frontend/api/$1",
      "headers": {
        "cache-control": "s-maxage=0"
      }
    },
    // Handle auth-protected routes
    {
      "src": "/(dashboard|admin|student)/(.*)",
      "dest": "/frontend/$1/$2",
      "headers": {
        "cache-control": "s-maxage=0, no-cache, no-store, must-revalidate"
      }
    },
    // Default route
    {
      "src": "/(.*)",
      "dest": "/frontend/$1"
    }
  ],
  "env": {
    "MONGODB_URI": "@mongodb-uri",
    "JWT_SECRET": "@jwt-secret",
    "NODE_ENV": "production"
  },
  "buildCommand": "cd frontend && npm run build:vercel",
  "outputDirectory": "frontend/.next"
};

// Write the configuration file
fs.writeFileSync(
  path.join(__dirname, 'vercel.json'),
  JSON.stringify(vercelConfig, null, 2)
);

console.log('Vercel configuration file created successfully!');
