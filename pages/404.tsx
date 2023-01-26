import React from "react";
import Error from "next/error";

import Layout from "@/components/layout";
import Link from "next/link";

interface NotFoundPageProps {
  statusCode: number;
}

const NotFoundPage = ({ statusCode = 404 }: NotFoundPageProps) => {
  return (
    // <Layout>
    <div>
      Not found 404
      <Link href="/">Go to Homepage</Link>
    </div>
    // </Layout>
  );
};

export default NotFoundPage;
