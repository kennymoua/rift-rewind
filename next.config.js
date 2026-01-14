/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ddragon.leagueoflegends.com",
        pathname: "/cdn/**",
      },
      {
        protocol: "https",
        hostname: "raw.communitydragon.org",
        pathname: "/**",
      },
    ],
  },
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ["lucide-react", "recharts", "framer-motion"],
  },
};

module.exports = nextConfig;

