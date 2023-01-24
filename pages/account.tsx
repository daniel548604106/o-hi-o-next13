import React from "react";
import { useQuery } from "react-query";
import Layout from "@/components/layout";

import { getAccountAPI } from "../api/account";

const Account = () => {
  const { data } = useQuery("account", getAccountAPI);

  console.log(data, "data");
  return <Layout>Account</Layout>;
};

export default Account;
