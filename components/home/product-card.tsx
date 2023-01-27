import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/router";

import Image from "next/image";
import { Product } from "@/interfaces";
import Link from "next/link";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { handleConvertDiscountPercentage } from "@/utils/priceConversion";

interface ProductCardProps {
  product: Product;
}
const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const handleToggleHeartIcon = (id: string) => {
    if (isLoggedIn) {
      //   setSaved(!saved);
      const type = "product";
      //   dispatch(addToFavorite(id, type));
      return;
    } else {
      router.push("/login");
    }
  };
  return (
    <Link
      href={`/products/${product._id}`}
      className="relative cursor-pointer rounded-md w-[200px]"
    >
      <div className="absolute top-0 flex items-center left-0 z-10 text-white uppercase">
        <p className="bg-light-blue px-4 py-2 text-sm">新品</p>
        {product.discountPrice && (
          <p className="bg-primary px-4 py-2 text-sm">
            {handleConvertDiscountPercentage(
              product.fullPrice,
              product.discountPrice
            )}
          </p>
        )}
      </div>
      {product ? (
        <div className="hover:opacity-70">
          <div className="relative">
            <Image
              className="w-[200px] aspect-square"
              width={200}
              height={200}
              src={product.images[0]}
              alt={product.name}
            />
            {true ? (
              <HeartSolidIcon
                onClick={() => handleToggleHeartIcon(product._id)}
                className={` text-main-pink h-5 sm:h-7 absolute bottom-1 cursor-pointer right-1 hover:text-gray-700 `}
              />
            ) : (
              <HeartIcon
                onClick={() => handleToggleHeartIcon(product._id)}
                className={`text-white h-5 sm:h-7 absolute bottom-1 cursor-pointer right-1 hover:text-gray-700 `}
              />
            )}
          </div>
          <div className="p-1 h-[100px] w-full max-w-[200px] flex  flex-col justify-between">
            <h2 className="text-sm md:text-md line-clamp-2 overflow-hidden font-semibold ">
              {product.name}
            </h2>
            <div>
              <h2 className="text-sm sm:text-md text-gray-600">
                {product.publishedBy.name}
              </h2>
              <div className="flex items-end">
                <span className="text-main-pink mr-1 text-md ">NTD</span>
                {product.discountPrice && (
                  <p className="text-main-pink mr-1 text-md">
                    ${product.discountPrice}
                  </p>
                )}
                <p
                  className={`
                    mr-1 text-sm text-gray-600
                    ${!product.discountPrice && "text-md text-main-pink"}
                    ${product.discountPrice ? "line-through ml-1" : ""}
                  `}
                >
                  ${product.fullPrice}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>loding...</>
      )}
    </Link>
  );
};

export default ProductCard;
