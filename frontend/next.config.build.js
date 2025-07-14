// Special Next.js config for Vercel build
// This will be used during the build process only

const path = require('path');

/** @type {import('next').NextConfig} */
const buildConfig = {
  // Standard settings
  reactStrictMode: true,
  output: 'standalone',
  transpilePackages: ['framer-motion'],
  
  // Configure image domains for security
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Skip TypeScript checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Skip ESLint checking during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Increase build timeout for large projects
  staticPageGenerationTimeout: 240,
  
  // Prevent static generation errors for auth pages
  experimental: {
    // Allow some dependencies to be bundled server-side
    serverComponentsExternalPackages: ['mongoose'],
    
    // Set limits for server actions
    serverActions: {
      bodySizeLimit: '2mb',
    },
    
    // Skip certain types of errors during build
    skipMiddlewareUrlNormalize: true,
    skipTrailingSlashRedirect: true,
  },
  
  // Allow more entries in the page map
  onDemandEntries: {
    maxInactiveAge: 120 * 1000,
    pagesBufferLength: 10,
  },
  
  // Fix path aliases
  webpack(config) {
    config.externals = [...config.externals, 'formidable'];
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src/')
    };
    return config;
  },
  
  // Prevent API routes from being prerendered
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, must-revalidate' },
        ],
      },
    ];
  },

  // Configure redirects for API routes
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },

  // Make sure the generateBuildId is consistent
  generateBuildId: async () => {
    return 'ieee-website-build'
  }
};

module.exports = buildConfig;
