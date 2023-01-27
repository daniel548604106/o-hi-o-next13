import React, { useState, useEffect } from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import useSWR from "swr";

import { fetcher } from "@/axios";
// import { centsToPrice } from "@/lib/helpers";
import { ROOT_DOMAIN } from "@/lib/constants";
import Layout from "@/components/layout";
import NotFoundPage from "@/pages/404";
import ImageSlider from "@/components/image-slider";
import Cta from "@/components/products/cta";

import type { Product as ProductType } from "@/interfaces";

const getProductUrl = (productId: string) => {
  return `/products/product/${productId}`;
};

type ProductProps = {
  data?: {
    product: ProductType;
    site: any;
    page: any;
  };
};

const Product = ({ data }: ProductProps) => {
  const { site, page } = data || {};

  const router = useRouter();
  const { query } = router;

  // set our Product state
  const [product, setProduct] = useState(data?.product);
  const [isSlideModalOpen, setSlideModalOpen] = useState<boolean>(false);

  const { images, name, description, fullPrice, discountPrice, totalInStock } =
    product || {};

  const URL = getProductUrl(data?.product?.id || "");

  // check our product inventory is still correct
  const { data: productInventory } = useSWR(
    URL,
    (url: string) => fetcher(url),
    { errorRetryCount: 3 }
  );

  // rehydrate our product after inventory is fetched
  useEffect(() => {
    if (data?.product && productInventory?.product) {
      const { product } = productInventory;
      console.log("hihi", product);
      setProduct({
        ...data.product,
        // inStock: productInventory.inStock,
        totalInStock: product.totalInStock,
        fullPrice: product.fullPrice,
        discountPrice: product.discountPrice,
        // variants: [
        //   ...page.product.variants.map((v) => {
        //     const newInventory = productInventory.variants.find(
        //       (nv) => nv.id === v.id
        //     );
        //     return newInventory ? { ...v, ...newInventory } : v;
        //   }),
        // ],
      });
    }
  }, [data?.product, productInventory]);

  if (!router.isFallback && !data) {
    return <NotFoundPage statusCode={404} />;
  }

  return (
    <Layout
      site={site}
      page={page}
      // schema={getProductSchema({ query, product, activeVariantID, site })}
    >
      <div className="max-w-6xl mx-auto p-0 sm:p-5x">
        <div className={`flex  mx-auto flex-col sm:flex-row mb-3 sm:mb-8`}>
          <section className={"w-full max-w-5xl"}>
            <ImageSlider
              slideImages={images?.map((src) => ({ src })) || []}
              isSlideModalOpen={isSlideModalOpen}
              setSlideModalOpen={setSlideModalOpen}
            />
          </section>
          <section className="w-full sm:w-[60%] sm:ml-5 px-3 py-3"></section>
        </div>

        <div className="flex flex-col sm:flex-row mx-auto mb-3 sm:mb-[30px] px-3 ">
          <h1 className="text-xl font-bold">{name}</h1>
          原價：{fullPrice}
          特價：{discountPrice}
          庫存：{totalInStock}
          <section className="sticky w-full sm:w-60% sm:ml-5   top-20 self-start">
            <Cta productId={product?.id || ""} />
            {/* <ShopInfo product={product} shopInfo={shopInfo} /> */}
          </section>
          <section className="max-w-5xl w-full">
            <div dangerouslySetInnerHTML={{ __html: description || "" }}></div>
          </section>
        </div>
        <div className="px-3">
          <section>
            {/* <ProductRecommendation products={recommendedProducts} /> */}
          </section>
        </div>
      </div>
    </Layout>
  );
};

// function getProductSchema({ query, product, activeVariantID, site }) {
//   if (!product) return null;

//   const variant = product.variants.find(
//     (variant) => variant.id == activeVariantID
//   );

//   return {
//     "@context": "http://schema.org",
//     "@type": "Product",
//     name: product.title,
//     price: centsToPrice(query.variant ? variant.price : product.price),
//     sku: query.variant ? variant.sku : product.sku,
//     offers: {
//       "@type": "Offer",
//       url: `${ROOT_DOMAIN}/products/${product.slug}${
//         query.variant ? `?variant=${variant.id}` : ""
//       }`,
//       availability: query.variant
//         ? `http://schema.org/${variant.inStock ? "InStock" : "SoldOut"}`
//         : `http://schema.org/${product.inStock ? "InStock" : "SoldOut"}`,
//       price: centsToPrice(query.variant ? variant.price : product.price),
//       priceCurrency: "USD",
//     },
//     brand: {
//       "@type": "Brand",
//       name: site.title,
//     },
//   };
// }

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in

export const getStaticProps: GetStaticProps<ProductProps> = async (context) => {
  const { params } = context;
  console.log(params, "req");
  const productId = params?.id || "";

  if (!productId) return { props: { notFound: true } };

  const URL = getProductUrl(productId as string);

  const { product = {}, site = {}, page = {} } = await fetcher(URL);
  // const res = await fetch('https://.../posts')
  // const posts = await res.json()
  return {
    props: {
      data: {
        product,
        site,
        page,
      },
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
