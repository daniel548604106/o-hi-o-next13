import Layout from "@/components/layout";
import { useRouter } from "next/router";
import Image from "next/image";
import { fetcher } from "@/axios";
import Loader from "@/components/loader";

import type { GetStaticProps } from "next";

interface IndexProps {
  stringifiedData: string;
}

export default function Index({ stringifiedData }: IndexProps) {
  const router = useRouter();
  if (router.isFallback) return <Loader />;

  const data = JSON.parse(stringifiedData);
  const { shop } = data;
  const { site, logo } = shop;
  const { meta: siteMeta } = site;
  const meta = {
    ...siteMeta,
    logo,
    ogImage: logo,
    ogUrl: siteMeta.customDomain
      ? siteMeta.customDomain
      : `https://${siteMeta.subdomain}.vercel.pub`,
  };

  return (
    <Layout site={site}>
      {meta.title}
      {meta.description}
      <Image src={logo} alt={meta.title} width={200} height={200} />
      <div className="w-full mb-20">sdf</div>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const { domains } = await fetcher("/shops/domain");
  const paths = domains?.map((domain: string) => ({
    params: {
      site: domain,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<IndexProps> = async ({
  params,
}) => {
  if (!params) throw new Error("No path parameters found");

  const { site } = params;

  const data = await fetcher(`/shops/${site}`);

  if (!data) return { notFound: true, revalidate: 10 };

  return {
    props: {
      stringifiedData: JSON.stringify(data),
    },
    revalidate: 3600,
  };
};
