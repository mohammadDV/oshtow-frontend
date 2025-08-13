import createNextIntlPlugin from "next-intl/plugin";
import withPWA from "next-pwa";

const withNextIntl = createNextIntlPlugin("./src/lib/next-intl.config.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oshtow.s3.ir-thr-at1.arvanstorage.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
};

const withPWAConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

export default withNextIntl(withPWAConfig(nextConfig as any) as any);
