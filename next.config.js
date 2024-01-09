/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: "https://oiowajvfcycwipgiyoxt.supabase.co",
    NEXT_PUBLIC_SUPABASE_KEY:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pb3dhanZmY3ljd2lwZ2l5b3h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA5MDU5MDQsImV4cCI6MjAxNjQ4MTkwNH0.4QOv_CxEaDKaYF7CXuUKHnSYUFTH2W_yHp-7sH6f0_I",
    NEXT_PUBLIC_LOGGER_APPLICATIONID: "541abfe6-41be-4d8e-84a2-fbbc411cb057",
    NEXT_PUBLIC_LOGGER_CLIENTSECRET: "957217f1-0a22-4cb0-aee0-aab02d764d0e",
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
