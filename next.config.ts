import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ftp.goit.study",
        pathname: "/img/readjourney/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/drfvfno3o/image/upload/**",
      },
    ],
  },
};

export default nextConfig;
