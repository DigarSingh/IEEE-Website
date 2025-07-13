/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Prevent hydration issues with framer-motion
  compiler: {
    styledComponents: true,
  },
  // Optimize Framer Motion for Next.js
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
  
  // API route to handle file uploads (increase limit to 50MB)
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },

  // Configure redirects for old API routes
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
}

module.exports = nextConfig
