import React, { useEffect, useCallback } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
// import { apiPostOauthLogin } from "../../api/index";
import Loader from "@/components/loader";
import { poster } from "@/axios";

// import { setUserLoggedIn } from "../../store/user/userAction";
const OAuthProviders = () => {
  const router = useRouter();

  const { code, state, providers } = router.query;

  const provider = providers?.[0] || "";

  const { data, error } = useSWR(
    { url: "/oauth/login", params: { type: provider, code } },
    ({ url, params }) => poster(url, params)
  );

  console.log(data, "data", error);
  // Cookie.set("me", data.user);
  // Cookie.set("token", data.token);
  // router.push("/");
  // dispatch(setUserLoggedIn(data.user));

  if (typeof window === "undefined") return null;
  if (!code || !state || !provider || error) {
    return null;
    router.replace("/");
    return null;
  }

  return (
    <div className="min-h-[100vh] w-full flex items-center justify-center">
      <Loader type="spinner" />
    </div>
  );
};

export default OAuthProviders;
