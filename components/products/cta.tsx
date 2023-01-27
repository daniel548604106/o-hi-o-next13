import React, { useState } from "react";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { useRouter } from "next/router";

interface ButtonProps {
  // @ts-ignore
  Icon: React.JsxElement;
  title: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
}

const Button = ({
  Icon,
  title,
  bgColor,
  textColor,
  borderColor,
}: ButtonProps) => {
  return (
    <button
      className={`${bgColor} ${textColor} ${borderColor} hover:opacity-90 py-3  flex items-center justify-center  w-full `}
    >
      <Icon className="h-5 mr-2" />
      <span className="whitespace-nowrap">{title}</span>
    </button>
  );
};

interface CTAProps {
  productId: string;
}

const CTA = ({ productId }: CTAProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const addItemToCart = () => {
    if (!isLoggedIn) {
      return router.push("/login");
    }
    // dispatch(addToCart(product));
  };

  const addToWishList = () => {
    const type = "product";
    // setSaved(!isSaved);
    // dispatch(addToFavorite(product._id, type));
  };

  return (
    <div>
      <span className="mb-3" onClick={() => addItemToCart()}>
        <Button
          bgColor="bg-primary"
          textColor="text-white"
          title="加入購物車"
          Icon={ShoppingCartIcon}
        />
      </span>
      {true ? (
        <span onClick={() => addToWishList()}>
          <Button
            bgColor="bg-white"
            textColor="text-primary"
            borderColor="border-primary border"
            title="Saved"
            Icon={HeartIcon}
          />
        </span>
      ) : (
        <span className="hidden sm:block" onClick={() => addToWishList()}>
          <Button
            bgColor="bg-black"
            textColor="text-white"
            title="Add To WishList"
            Icon={HeartIcon}
          />
        </span>
      )}
    </div>
  );
};

export default CTA;
