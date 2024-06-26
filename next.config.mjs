/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  /*
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'self' https://sensible-condor-58.clerk.accounts.dev blob: data:; img-src 'self' blob: data: res.cloudinary.com https://img.clerk.com ;style-src 'self' 'unsafe-inline'; script-src 'unsafe-eval' 'self' 'unsafe-inline' https://sensible-condor-58.clerk.accounts.dev blob: data:;",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload;",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "microphone=(), camera=(), geolocation=(), fullscreen=(), payment=()",
          },
        ],
      },
    ];
  },
Removed from vercel.json cause of maps
{
          "key": "Content-Security-Policy",
          "value": "default-src 'self' https://sensible-condor-58.clerk.accounts.dev blob: data:; img-src 'self' blob: data: res.cloudinary.com https://img.clerk.com ;style-src 'self' 'unsafe-inline'; script-src 'unsafe-eval' 'self' 'unsafe-inline' https://sensible-condor-58.clerk.accounts.dev blob: data:; frame-src https://en.frame.mapy.cz/s/depokobuvu "
        },
  */
};

export default nextConfig;
