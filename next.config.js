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
};

const prod = process.env.NODE_ENV === "production";

const withPWA = require("next-pwa")({
  // Do not recreate in dev mode
  disable: prod ? false : true,
  dest: "public",
});

module.exports = withPWA(nextConfig);
