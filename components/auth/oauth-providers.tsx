import React from "react";
import { useRouter } from "next/router";
import qs from "query-string";

import Image from "next/image";

enum Providers {
  facebook = "facebook",
  google = "google",
  line = "line",
}

const CONFIG = {
  [Providers.facebook]: {
    scope: "email",
    response_type: "code",
    redirect_uri: process.env.FACEBOOK_URI,
    client_id: process.env.FACEBOOK_CLIENT_ID,
  },
  [Providers.google]: {
    scope: "email profile",
    response_type: "code",
    access_type: "offline",
    redirect_uri: process.env.GOOGLE_URI,
    client_id: process.env.GOOGLE_ID,
  },
  [Providers.line]: {
    state: "login",
    scope: "openid profile email",
    response_type: "code",
    redirect_uri: process.env.LINE_URI,
    client_id: process.env.LINE_ID,
    nonce: "09876xyz",
  },
};

const PROVIDERS = [
  {
    name: Providers.facebook,
    color: "blue-300",
    redirectUri: "https://www.facebook.com/v9.0/dialog/oauth",
  },
  {
    name: Providers.google,
    color: "#fff",
    redirectUri: "https://accounts.google.com/o/oauth2/v2/auth",
  },
  {
    name: Providers.line,
    color: "green",
    redirectUri: "https://access.line.me/oauth2/v2.1/authorize",
  },
];

const OAuthProviders = () => {
  const router = useRouter();
  const handleOAuthLogin = ({
    name,
    redirectUri,
  }: {
    name: Providers;
    redirectUri: string;
  }) => {
    // const query = Object.entries(CONFIG[name])
    //   .map(([key, value]) => `${key}=${value}`)
    //   .join("&");

    const query = qs.stringify(CONFIG[name]);

    router.push(`${redirectUri}?${query}`);
  };
  return (
    <div className="w-full space-x-2 my-3 flex items-center">
      {PROVIDERS.map(({ name, color, redirectUri }) => (
        <div
          onClick={() => handleOAuthLogin({ name, redirectUri })}
          key={name}
          className={`cursor-pointer p-2 w-full flex justify-center rounded-md bg-${color}`}
        >
          <Image
            width={48}
            height={48}
            src={`/images/social/${name}.svg`}
            alt={name}
          />
        </div>
      ))}
    </div>
  );
};
export default OAuthProviders;
