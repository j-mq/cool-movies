/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    TMDP_KEY: process.env.TMDP_KEY,
  },
};

module.exports = nextConfig;
