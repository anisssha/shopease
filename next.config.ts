/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // keep output: 'export' if you want to export static HTML
  // output: 'export',

  images: {
    domains: ["fakestoreapi.com", "your-image-host.com"],
  },
};

module.exports = nextConfig;
