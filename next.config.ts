import type { NextConfig } from "next";

// No-op bump: trigger Vercel production deploy.

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/video/mcb-creative-hp-video.mp4",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
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
