/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.builder.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "portal.edura.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "edura.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/images/**",
      },
    ],
    unoptimized: true,
  },

  output: "standalone",

  typescript: {
    ignoreBuildErrors: true,
  },

  turbopack: {},
}

export default nextConfig
