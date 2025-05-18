/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Prevent hydration issues with framer-motion
  compiler: {
    styledComponents: true,
  },
  // Optimize Framer Motion for Next.js
  transpilePackages: ['framer-motion'],
}

module.exports = nextConfig
