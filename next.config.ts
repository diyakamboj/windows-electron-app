/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Ensure CSS is included in the build
  experimental: {
    appDir: true,
  },
  // Add basePath for production
  ...(process.env.NODE_ENV === "production"
    ? {
        basePath: "",
        assetPrefix: "./",
      }
    : {}),
  // Ensure CSS modules work
  webpack: (config: import("webpack").Configuration) => {
    return config;
  },
};

module.exports = nextConfig;
