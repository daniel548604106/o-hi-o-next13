import React from "react";
import { GetStaticProps } from "next";
import Image from "next/image";

import { fetcher } from "@/axios";

import type { Product as ProductType } from "@/interfaces";

type Props = {
  product: ProductType;
};

const Product = ({ product }: Props) => {
  const { images, name } = product;
  return (
    <div>
      <h1 className="text-blue-500 font-bold">{name}</h1>
      {images?.map((src: string) => (
        <Image key={src} src={src} width={200} height={200} alt={name} />
      ))}
    </div>
  );
};

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export const getStaticProps: GetStaticProps<{ product?: ProductType }> = async (
  context
) => {
  const { params } = context;
  console.log(params, "req");
  const productId = params?.id || "";

  if (!productId) return { props: { notFound: true } };

  const URL = `products/product/${productId}`;
  const { product } = await fetcher(URL);
  // const res = await fetch('https://.../posts')
  // const posts = await res.json()
  return {
    props: {
      product,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10,
  };
};

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const URL = "/products";

  const { products } = await fetcher(URL);

  // Get the paths we want to pre-render based on posts
  const paths = products.map((product: ProductType) => ({
    params: { id: product.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}

export default Product;
