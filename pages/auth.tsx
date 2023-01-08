import React, { useState } from "react";

import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "@/components/layout";
import { useTranslation } from "next-i18next";

enum Tabs {
  LOGIN = "login",
  SIGNUP = "signup",
}

const OAuthMethods = ["facebook", "google", "line"];

const OAuthProviders = () => {
  const router = useRouter();
  // const oAuthLogin = (provider) => {
  //   const uri = redirectUri(provider);
  //   const query = qs.stringify(config[provider]);
  //   router.push(`${uri}${query}`);
  // };
  return (
    <div className="w-full max-w-300px my-20px flex items-center justify-between ">
      {OAuthMethods.map((method) => (
        <div
          key={method}
          className="cursor-pointer p-10px border rounded"
          //   onClick={() => oAuthLogin(method)}
        >
          <Image
            width={48}
            height={48}
            src={`/images/social/${method}.svg`}
            alt={method}
          />
        </div>
      ))}
    </div>
  );
};

const Auth = () => {
  const router = useRouter();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const { t } = useTranslation("auth");

  const [activeTab, setActiveTab] = useState(Tabs.LOGIN);
  //   const handleLogin = async () => {
  //     try {
  //       const { data } = await apiPostLogin({ account, password });
  //       Cookie.set("me", data.user);
  //       Cookie.set("token", data.token);
  //       dispatch(closeLoginModal());
  //       dispatch(setUserLoggedIn(data));
  //     } catch (error) {
  //       console.log("失敗");
  //     }
  //   };
  return (
    <Layout>
      <div className="py-8 px-4 sm:py-16 w-full max-w-lg flex flex-col items-center justify-center min-h-60vh text-center  mx-auto">
        <div className="flex items-center w-full">
          {Object.values(Tabs).map((tab) => (
            <button
              onClick={() => setActiveTab(tab)}
              className={` p-3 text-center flex-1 border ${
                activeTab === tab ? "bg-white border-b-0 " : "bg-gray-50"
              }`}
              key={tab}
            >
              {t(tab)}
            </button>
          ))}
        </div>
        <div className="border border-t-0 w-full p-4">
          <OAuthProviders />
          <div className="mb-2  sm:flex-col text-left  w-full flex items-center sm:items-start">
            <input
              placeholder="Email"
              className="w-full border  rounded-md px-10px py-10px"
              onChange={(e) => setAccount(e.target.value)}
              type="email"
            />
          </div>
          <div className="mb-2 sm:flex-col w-full flex text-left items-center sm:items-start">
            <input
              placeholder="Password"
              className=" w-full  border  rounded-md px-10px py-10px "
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>
          <button
            className="text-main-pink my-3"
            onClick={() => router.push("forgetpassword")}
          >
            忘記密碼
          </button>
          <button
            className="w-full my-3 p-3 border rounded"
            // onClick={() => handleLogin()}
          >
            登入
          </button>
          <p className="my-5 text-sm sm:text-lg">或用以下帳號繼續</p>
          {/* <SocialLogin /> */}
          <p className="my-3 text-sm">
            還不是會員嗎？{" "}
            <strong
              className="cursor-pointer underline text-main-pink"
              onClick={() => router.push("signup")}
            >
              立刻註冊帳號
            </strong>
          </p>
        </div>

        <button className="text-sm my-5" onClick={() => router.back()}>
          回上一頁
        </button>
      </div>
    </Layout>
  );
};

export default Auth;
