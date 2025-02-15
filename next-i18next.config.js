module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fa"],
    localeDetection: false,
  },
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
