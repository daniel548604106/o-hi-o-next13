import React from "react";
import { useRouter } from "next/router";

import Image from "next/image";
import Link from "next/link";

const OAuthMethods = [
  { name: "facebook", color: "blue-300" },
  { name: "google", color: "#fff" },
  { name: "line", color: "green" },
];

const OAuthProviders = () => {
  const router = useRouter();
  // const oAuthLogin = (provider) => {
  //   const uri = redirectUri(provider);
  //   const query = qs.stringify(config[provider]);
  //   router.push(`${uri}${query}`);
  // };
  return (
    <div className="w-full space-x-2 my-3 flex items-center">
      {OAuthMethods.map(({ name, color }) => (
        <Link
          href={`/auth/oauth/${name}`}
          key={name}
          className={`cursor-pointer p-2 w-full flex justify-center rounded-md bg-${color}`}
        >
          <Image
            width={48}
            height={48}
            src={`/images/social/${name}.svg`}
            alt={name}
          />
        </Link>
      ))}
    </div>
  );
};
export default OAuthProviders;
