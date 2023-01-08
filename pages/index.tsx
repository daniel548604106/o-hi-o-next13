import type {
  GetStaticProps,
  GetServerSideProps,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "@next/font/google";
import Layout from "@/components/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation, Trans } from "next-i18next";

import type { Product as ProductType } from "@/interfaces";

import styles from "../styles/Home.module.css";
import { fetcher } from "@/axios";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  fallbackData: {
    products: ProductType[];
    currentPage: number;
    totalPage: number;
  };
}

const URL = "/products";

const Home = ({ fallbackData }: Props) => {
  const { t } = useTranslation("common");

  const { data, error } = useSWR(URL, fetcher, { fallbackData });

  const { site = {}, page = {}, products } = data;

  return (
    <>
      <Layout
        site={site}
        page={page}
        // schema={getProductSchema({ query, product, activeVariantID, site })}
      >
        <main className={styles.main}>
          <div className="max-w-5xl	mx-auto flex items-center flex-wrap">
            {products?.map(({ images, id, name }: ProductType) => (
              <Link key={id} href={`products/${id}`}>
                <Image
                  className="w-[200px] h-[200px] object-cover"
                  width={200}
                  height={200}
                  src={images[0]}
                  alt={name}
                />
              </Link>
            ))}
            <p>{t("welcome")}</p>
          </div>
        </main>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  locale,
}) => {
  const data = await fetcher(URL);
  return {
    props: {
      fallbackData: data,
      ...(await serverSideTranslations(locale ?? "en-US", [
        "common",
        "footer",
      ])),
    },
  };
};

export default Home;
