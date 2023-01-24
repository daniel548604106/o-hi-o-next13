import Layout from "@/components/layout";
import { useRouter } from "next/router";
import Image from "next/image";
import { fetcher } from "@/axios";
import Loader from "@/components/loader";

import type { GetStaticPaths, GetStaticProps } from "next";
import type { _SiteData, Meta } from "@/types";

interface PathProps {
  site: string;
}

interface IndexProps {
  stringifiedData: string;
}

export default function Index({ stringifiedData }: IndexProps) {
  const router = useRouter();
  if (router.isFallback) return <Loader />;

  const data = JSON.parse(stringifiedData) as _SiteData;
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
  } as Meta;

  return (
    <Layout site={site}>
      {meta.title}
      {meta.description}
      <Image src={logo} alt={meta.title} width={200} height={200} />
      <div className="w-full mb-20">sdf</div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths<PathProps> = async () => {
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

export const getStaticProps: GetStaticProps<IndexProps, PathProps> = async ({
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
