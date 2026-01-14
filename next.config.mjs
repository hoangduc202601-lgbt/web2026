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
};

export default nextConfig;

