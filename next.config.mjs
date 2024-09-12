/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
