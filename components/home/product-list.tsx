import React from "react";

import { Product } from "@/interfaces";
import ProductCard from "./product-card";
import Link from "next/link";

interface ProductListProps {
  title: string | React.ReactNode;
  products: Product[];
  showMore?: boolean;
  direction?: "row" | "col";
}

const ProductList = ({
  title,
  products,
  showMore = true,
  direction = "row",
}: ProductListProps) => {
  console.log(products, "currentProducts");

  const display =
    direction === "col"
      ? "grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2"
      : "flex items-center space-x-2 scrollbar-hide overflow-scroll whitespace-nowrap";
  return (
    <div className="px-2 py-3 sm:py-5">
      <div className="flex items-center mb-2 sm:mb-5 justify-between">
        {typeof title === "string" ? (
          <h2 className="font-semibold  text-lg sm:text-2xl">{title}</h2>
        ) : (
          title
        )}
        {showMore && (
          <Link
            href="/explore"
            className="text-sm lg:text-md text-primary cursor-pointer"
          >
            查看更多
          </Link>
        )}
      </div>
      <div className={`${display}`}>
        {products?.map((product) => (
          <div key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
