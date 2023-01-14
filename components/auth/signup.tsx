// typescript import
import { ActiveComponentProps, TabsEnum } from "./";

import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import { Field, Form, ErrorMessage, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";

interface SignupProps extends ActiveComponentProps {}

const Signup = ({}: SignupProps) => {
  const { t } = useTranslation("auth");

  const router = useRouter();

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
    <Formik
      initialValues={{ email: "", password: "", gender: "", birthday: "" }}
      validate={(values) => {
        const errors: { [key: string]: string } = {};
        if (!values.email) {
          errors.email = t("required");
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = t("invalid-email");
        }

        if (!values.password) errors.password = t("required");
        if (!values.gender) errors.gender = t("required");
        if (!values.birthday) errors.birthday = t("required");

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ values, errors, touched, isSubmitting }: FormikProps<any>) => (
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
            <div>
              <Field
                as="select"
                name="gender"
                component="select"
                className="w-full py-2 px-5 border"
              >
                <option value="gender" disabled>
                  {t("gender")}
                </option>
                <option value="male">{t("male")}</option>
                <option value="female">{t("female")}</option>
                <option value="others">{t("others")}</option>
              </Field>
              <ErrorMessage
                name="gender"
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <Field
                placeholder="Birthday"
                className="w-full  border  px-5 py-2 bg-transparent rounded-sm "
                type="date"
                name="birthday"
              />
              <ErrorMessage
                name="birthday"
                component="div"
                className="text-red-500"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full my-3 p-3 border bg-primary text-white rounded"
          >
            {t("join-us")}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Signup;
