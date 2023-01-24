// typescript import
import { ActiveComponentProps, TabsEnum } from "./";

import useSWR from "swr";
import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import { Field, Form, ErrorMessage, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";

interface LoginProps extends ActiveComponentProps {}

const Login = ({ setActiveTab }: LoginProps) => {
  const { t } = useTranslation("auth");

  const router = useRouter();

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      // const { data } = await apiPostLogin({ account: email, password });
      //   Cookie.set("account", data.user);
      //   Cookie.set("token", data.token);
      //   dispatch(setUserLoggedIn(data));
    } catch (error) {
      console.log("失敗");
    }
  };
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const errors: { [key: string]: string } = {};
        if (!values.email) {
          errors.email = t("required");
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = t("invalid-email");
        }

        if (!values.password) {
          errors.password = t("required");
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        const { email, password } = values;
        setTimeout(() => {
          handleLogin({ email, password });
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }: FormikProps<any>) => (
        <Form>
          <div className="space-y-4 text-left">
            <div>
              <Field
                className="w-full border px-5 py-2 mt-3 rounded-sm"
                type="email"
                name="email"
                placeholder={t("email")}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <Field
                placeholder={t("password")}
                className=" w-full  border  px-5 py-2 bg-transparent rounded-sm "
                type="password"
                name="password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full my-3 p-3 border  bg-primary text-white rounded"
          >
            {t("login")}
          </button>
          <button
            className="my-3"
            onClick={() => setActiveTab?.(TabsEnum.FORGETPASSWORD)}
          >
            {t("forget-password")}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
