import React from "react";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";

const Cart = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  return (
    <div>
      {cartItems.length ? (
        <div>
          sadasd
          <Link href="/checkout">Checkout</Link>
        </div>
      ) : (
        <div>Your cart is empty , explore</div>
      )}
    </div>
  );
};

export default Cart;
