/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  debug: process.env.NODE_ENV === "development",
  i18n: {
    defaultLocale: "en-US",
    locales: ["en-US", "zh-TW"],
  },
  fallbackLng: {
    default: ["en-US"],
  },
};
