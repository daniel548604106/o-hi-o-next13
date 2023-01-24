import React, { useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import Loader from "@/components/loader";
import { postOAuthLoginAPI } from "../../../api/auth";
import { useMutation } from "react-query";
import { useStateContext } from "../../../context";
import { addAxiosToken } from "@/axios";

const OAuthProviders = () => {
  const router = useRouter();

  const { code, state, providers } = router.query;

  const { dispatch, state: contextState } = useStateContext();

  const provider = providers?.[0] || "";

  const { mutate } = useMutation(postOAuthLoginAPI, {
    onSuccess: async ({ data }) => {
      const { user, accessToken, refreshToken } = data;
      console.log(data, "data");
      // await dispatch({
      //   type: "LOGIN",
      //   payload: {
      //     user,
      //     accessToken,
      //     refreshToken,
      //   },
      // });
      console.log(dispatch, contextState, "state here");

      // Cookies.set('refreshToken', refreshToken);

      setTimeout(() => {
        router.push("/");
      }, 1500);
    },
  });

  useEffect(() => {
    if (code && state && provider) {
      mutate({ type: provider, code: code as string });
    }
  }, [code, dispatch, mutate, provider, router, state]);

  return (
    <div className="min-h-[100vh] w-full flex items-center justify-center">
      <Loader type="spinner" />
    </div>
  );
};

export default OAuthProviders;
