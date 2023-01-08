import React from "react";
import Error from "next/error";

import Layout from "@/components/layout";

interface NotFoundPageProps {
  statusCode: number;
}

const NotFoundPage = ({ statusCode = 404 }: NotFoundPageProps) => {
  return (
    // <Layout>
    <Error
      title={`"Error Page (404)" is not set in Sanity, or the page data is missing`}
      statusCode={statusCode}
    />
    // </Layout>
  );
};

export default NotFoundPage;
