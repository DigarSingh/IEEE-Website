#!/usr/bin/env node
/**
 * IEEE Website Build Script
 * This script orchestrates the complete build process for Vercel deployment
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

// Print banner
console.log(`
${colors.cyan}${colors.bright}╔════════════════════════════════════════╗
║        IEEE WEBSITE BUILD PROCESS        ║
╚════════════════════════════════════════╝${colors.reset}
`);

// Helper function to execute a build step
const executeStep = (stepName, command) => {
  console.log(`\n${colors.cyan}▶ ${stepName}...${colors.reset}`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`${colors.green}✓ ${stepName} completed successfully${colors.reset}`);
    return true;
  } catch (error) {
    console.error(`${colors.red}✗ ${stepName} failed${colors.reset}`);
    console.error(error.message);
    return false;
  }
};

// Main build steps
const buildSteps = [
  {
    name: 'Fixing import paths',
    command: 'node fix-import-paths.js',
  },
  {
    name: 'Creating mock data',
    command: 'node create-mock-data.js',
  },
  {
    name: 'Preparing build-safe auth context',
    command: 'node create-build-safe-auth.js',
  },
  {
    name: 'Skipping auth-required pages',
    command: 'node skip-auth-pages.js',
  },
  {
    name: 'Building Next.js application',
    command: 'set NODE_ENV=production && set NEXT_CONFIG_FILE=next.config.build.js && npx next build',
  },
  {
    name: 'Restoring auth-required pages',
    command: 'node restore-auth-pages.js',
  },
  {
    name: 'Restoring original auth context',
    command: 'node restore-auth-context.js',
  },
];

// Execute all build steps
console.log(`${colors.yellow}Starting build process with ${buildSteps.length} steps...${colors.reset}`);

let failedSteps = 0;
let completedSteps = 0;

for (const [index, step] of buildSteps.entries()) {
  console.log(`\n${colors.yellow}Step ${index + 1}/${buildSteps.length}: ${step.name}${colors.reset}`);
  
  if (executeStep(step.name, step.command)) {
    completedSteps++;
  } else {
    failedSteps++;
    // For critical steps, stop the build
    if (step.name.includes('Building Next.js')) {
      console.error(`${colors.red}${colors.bright}Critical step failed. Stopping build process.${colors.reset}`);
      process.exit(1);
    }
  }
}

// Print build summary
console.log(`\n${colors.cyan}${colors.bright}╔════════════════════════════════════════╗
║             BUILD SUMMARY              ║
╚════════════════════════════════════════╝${colors.reset}`);
console.log(`${colors.green}✓ ${completedSteps} steps completed successfully${colors.reset}`);
if (failedSteps > 0) {
  console.log(`${colors.red}✗ ${failedSteps} steps failed${colors.reset}`);
  process.exit(1);
} else {
  console.log(`${colors.green}${colors.bright}All steps completed successfully!${colors.reset}`);
  console.log(`${colors.green}The application is ready for deployment.${colors.reset}`);
}
