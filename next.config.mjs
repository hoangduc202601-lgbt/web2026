/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Tắt Next.js Dev Tools indicator
  devIndicators: false,
  // Cho phép sử dụng external images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/category/:slug*',
        destination: '/danh-muc/:slug*',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;

