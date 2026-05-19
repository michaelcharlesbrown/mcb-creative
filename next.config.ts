import type { NextConfig } from "next";

// No-op bump: trigger Vercel production deploy.

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/formulator",
        destination: "/formulator/index.html",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
