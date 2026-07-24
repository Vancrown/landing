/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === "production";
const repoName = "landing";

const nextConfig = {
  output: "export",
  trailingSlash: true,

  basePath: isProduction ? `/${repoName}` : "",

  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
