import Layout from "@/components/layout";
import { useRouter } from "next/router";
import Image from "next/image";
import { fetcher } from "@/axios";
import Loader from "@/components/loader";
import Modules from "@/components/modules";

import type { GetStaticProps } from "next";

interface IndexProps {
  stringifiedData: string;
}

const MODULES = [
  {
    _type: "carousel",
    id: "12311231223",
    style: {
      width: "100%",
      height: "100%",
    },
    data: {
      slides: [
        {
          src: "https://images.unsplash.com/photo-1661956602944-249bcd04b63f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
          width: 400,
          height: 200,
          alt: "carousel",
          id: "123",
          url: "/products",
        },
        {
          src: "https://images.unsplash.com/photo-1661961110144-12ac85918e40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
          width: 300,
          height: 500,
          alt: "carousel",
          id: "1234",
          url: "",
        },
      ],
    },
  },
  {
    _type: "image",
    id: "123123",
    style: {
      width: "100%",
      height: 300,
    },
    data: {
      src: "https://images.unsplash.com/photo-1661956602944-249bcd04b63f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
      width: 400,
      height: 200,
      alt: "carousel",
      id: "123",
      url: "",
    },
  },
];

export default function Index({ stringifiedData }: IndexProps) {
  const router = useRouter();
  if (router.isFallback) return <Loader />;

  const data = JSON.parse(stringifiedData);
  const { shop } = data || {};
  const { site, logo } = shop || {};
  const { meta: siteMeta } = site || {};
  const meta = {
    ...siteMeta,
    logo,
    ogImage: logo,
    ogUrl: siteMeta?.customDomain
      ? siteMeta?.customDomain
      : `https://${siteMeta?.subdomain}.vercel.pub`,
  };

  return (
    <Layout site={{ ...site, logo }}>
      <div className="max-w-6xl mx-auto px-3  py-4 sm:px-5  sm:py-6">
        {meta.title}
        {meta.description}
        <Image src={logo} alt={meta.title} width={200} height={200} />
        {MODULES.map((module) => (
          <Modules key={module.id} module={module} />
        ))}
      </div>
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
