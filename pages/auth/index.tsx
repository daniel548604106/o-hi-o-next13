// typescript import
import { GetStaticProps } from "next";

import React, { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Layout from "@/components/layout";
import { useTranslation } from "next-i18next";
import {
  Login,
  Signup,
  ForgetPassword,
  OAuthProviders,
} from "@/components/auth";

export enum TabsEnum {
  LOGIN = "login",
  SIGNUP = "signup",
  FORGETPASSWORD = "forgetPassword",
}

const Tabs = [TabsEnum.LOGIN, TabsEnum.SIGNUP];

const tabsComponent = {
  login: Login,
  signup: Signup,
  forgetPassword: ForgetPassword,
};

const Auth = () => {
  const { t } = useTranslation("auth");

  const [activeTab, setActiveTab] = useState(TabsEnum.LOGIN);

  const ActiveComponent = tabsComponent[activeTab] ?? <></>;

  return (
    <Layout>
      <div className="py-8 px-4 sm:py-16 w-full max-w-lg flex flex-col items-center justify-center min-h-60vh text-center  mx-auto">
        <div className="flex items-center w-full">
          {Tabs.map((tab) => (
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
          {activeTab !== TabsEnum.FORGETPASSWORD ? <OAuthProviders /> : null}
          <ActiveComponent setActiveTab={setActiveTab} />
        </div>
      </div>
    </Layout>
  );
};

export default Auth;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en-US", ["auth"])),
    },
  };
};
