import React, { useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import Loader from "@/components/loader";
import { postOAuthLoginAPI } from "../../../api/auth";
import { useMutation } from "react-query";
import { addAxiosToken } from "@/axios";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { login } from "@/redux/slices/authSlice";

const OAuthProviders = () => {
  const router = useRouter();

  const { code, state, providers } = router.query;
  const dispatch = useAppDispatch();

  const provider = providers?.[0] || "";

  const { mutate } = useMutation(postOAuthLoginAPI, {
    onSuccess: async ({ data }) => {
      const { user, accessToken } = data;
      console.log(data, "data");
      await dispatch(login({ user, accessToken }));

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
