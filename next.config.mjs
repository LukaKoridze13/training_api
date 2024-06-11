import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Content-Type",
            value: "application/json",
          },
          {
            key: "Allow",
            value: "GET, POST, PUT, OPTIONS, DELETE",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, OPTIONS, DELETE",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Authorization, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
