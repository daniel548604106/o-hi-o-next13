import Layout from "@/components/layout";
import { useRouter } from "next/router";
import Image from "next/image";
import { fetcher } from "@/axios";
import Loader from "@/components/loader";
import Modules from "@/components/modules";

import type { GetStaticProps } from "next";

interface IndexProps {
  data: unknown;
}

export default function Index({ data }: IndexProps) {
  const router = useRouter();
  if (router.isFallback) return <Loader />;

  console.log(data, "datata");
  // @ts-ignore
  const { site, page } = data || {};
  const { site: siteData, logo } = site || {};
  const { meta: siteMeta } = siteData || {};
  const meta = {
    ...siteMeta,
    logo,
    ogImage: logo,
    ogUrl: siteMeta?.customDomain
      ? siteMeta?.customDomain
      : `https://${siteMeta?.subdomain}.vercel.pub`,
  };

  return (
    <Layout site={{ ...siteData, logo }}>
      <div className="max-w-6xl mx-auto px-3  py-4 sm:px-5  sm:py-6">
        {meta.title}
        {meta.description}
        <Image src={logo} alt={meta.title} width={200} height={200} />
        {/* @ts-ignore */}
        {page?.modules?.map((module) => (
          <Modules key={module.id} module={module} />
        ))}
      </div>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const { domains } = await fetcher("/shops/domain");
  const paths = domains?.map((data: { domain: string; page: string }) => ({
    params: {
      site: data.domain,
      path: "/",
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

  console.log(params, "params");
  const { site } = params;

  const data = await fetcher(`/shops/${site}?page=/`);

  if (!data || !data.page) return { notFound: true, revalidate: 10 };

  return {
    props: {
      data,
    },
    revalidate: 3600,
  };
};
