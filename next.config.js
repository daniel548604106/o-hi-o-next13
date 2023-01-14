const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: [
      "photo.airspaceonline.com",
      "upload.cc",
      "farm1.staticflickr.com",
      "c1.staticflickr.com",
      "live.staticflickr.com",
      "i.redd.it",
      "64.media.tumblr.com",
      "images.unsplash.com",
      "ik.imagekit.io",
      "img.alicdn.com",
      "muku-store.com",
      "profile.line-scdn.net",
      "cdn03.pinkoi.com",
      "64.media.tumblr.com",
      "craftbagth.com",
      "*",
    ],
  },
  env: {
    FACEBOOK_URI: process.env.FACEBOOK_URI,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
    GOOGLE_URI: process.env.GOOGLE_URI,
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    LINE_ID: process.env.LINE_ID,
    LINE_URI: process.env.LINE_URI,
    LINE_SECRET: process.env.LINE_SECRET,
  },
};

const prod = process.env.NODE_ENV === "production";

const withPWA = require("next-pwa")({
  // Do not recreate in dev mode
  disable: prod ? false : true,
  dest: "public",
});

module.exports = withPWA(nextConfig);
