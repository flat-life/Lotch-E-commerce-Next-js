import type { NextConfig } from "next";

const nextConfig = {
  i18n: {
    locales: ["en", "fa"],
    defaultLocale: "en",
    localeDetection: false,
  },
};

export default nextConfig;
