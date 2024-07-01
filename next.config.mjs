/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["avatars.githubusercontent.com", "d2yxqfr8upg55w.cloudfront.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "d2yxqfr8upg55w.cloudfront.net",
      },
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
