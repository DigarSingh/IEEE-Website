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
  
  // Configure server for larger payloads and file uploads
  experimental: {
    serverComponentsExternalPackages: [],
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },

  // Allow file uploads in API routes
  webpack(config) {
    config.externals = [...config.externals, 'formidable'];
    return config;
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
