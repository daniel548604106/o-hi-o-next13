import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import Layout from "@/components/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import type {
  PaginatedProducts as PaginatedProductsType,
  Banner as BannerType,
} from "@/interfaces";

import {
  getBannersAPI,
  getProductsAPI,
  getRecommendedProductsAPI,
  getDiscountedProductsAPI,
} from "../api";
import Image from "next/image";
import Banners from "@/components/home/banners";
import ProductList from "@/components/home/product-list";

interface Props {
  data: [
    { banners: BannerType[] },
    { recommendedProducts: PaginatedProductsType[] },
    { discountedProducts: PaginatedProductsType[] },
    { products: PaginatedProductsType[] }
  ];
}

const Home = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t } = useTranslation("common");

  console.log(data, "data1");
  const [banners, recommendedProducts, discountedProducts, products] = data;

  return (
    <>
      <Layout>
        <Banners banners={banners?.banners} />

        <div className="max-w-6xl mx-auto">
          <ProductList
            title={"推薦商品"}
            // @ts-ignore

            products={recommendedProducts?.products}
          />
          <ProductList
            title={"限時優惠"}
            // @ts-ignore

            products={discountedProducts?.products}
          />
          <ProductList
            title={
              <div className="w-full sticky self-start top-0   flex items-center  border border-primary text-primary py-2 rounded-tr-xl rounded-bl-xl justify-center space-x-1">
                <Image
                  width={100}
                  height={50}
                  src="/O.HI.O-logo.svg"
                  alt="logo"
                />
                <h2 className="font-500 text-2xl">隨便逛逛</h2>
              </div>
            }
            // @ts-ignore
            products={products?.products}
            showMore={false}
            direction="col"
          />
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  locale,
}) => {
  function handleResults<T>(results: T | []) {
    const errors = results
      // @ts-ignore
      .filter((result) => result.status === "rejected")
      // @ts-ignore
      .map((result) => result.reason);

    if (errors.length) {
      // Aggregate all errors into one
      throw new AggregateError(errors);
    }
    // @ts-ignore

    return results.map((result) => result.value?.data);
  }

  const results = await Promise.allSettled([
    getBannersAPI(),
    getRecommendedProductsAPI(),
    getDiscountedProductsAPI(),
    getProductsAPI(),
  ]);

  const data = handleResults<typeof results>(results);

  return {
    props: {
      data,
      ...(await serverSideTranslations(locale ?? "en-US", [
        "common",
        "footer",
      ])),
    },
  };
};

export default Home;
