// typescript import
import { Dispatch, SetStateAction } from "react";
import { TabsEnum } from "@/pages/auth";

export interface ActiveComponentProps {
  setActiveTab?: Dispatch<SetStateAction<TabsEnum>>;
}

export { TabsEnum };

export { default as Signup } from "./signup";
export { default as Login } from "./login";
export { default as ForgetPassword } from "./forget-password";
export { default as OAuthProviders } from "./oauth-providers";
