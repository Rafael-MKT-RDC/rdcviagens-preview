/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // domínios das imagens usadas hoje (CDNs do preview)
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
};
export default nextConfig;
