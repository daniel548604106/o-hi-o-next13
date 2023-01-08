import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Bars2Icon,
  ShoppingBagIcon,
  UserIcon,
  MagnifyingGlassIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
// import { BeakerIcon } from '@heroicons/react/24/solid'

// import { useDispatch, useSelector } from "react-redux";
// import { toggleSideMenu } from "../../redux/actions/globalAction";
// import { addToFavorite } from "../../api/favoriteRequest";
const Header = () => {
  const router = useRouter();
  //   const dispatch = useDispatch();
  const toCart = () => {
    router.push("/cart");
  };
  //   const isUserLoggedIn = useSelector((state) => state.user.isUserLoggedIn);
  //   const currentUser = useSelector((state) => state.user.currentUser);
  //   const totalItems = useSelector((state) => state.cart.cartItems)
  //     .map((item) => item.quantity)
  //     .reduce((total, current) => total + current);
  return (
    <header className="border-b  px-15px ">
      <div className=" max-w-6xl h-60px mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Bars2Icon
            // onClick={() => dispatch(toggleSideMenu())}
            className="min-w-10px text-gray-700 cursor-pointer inline-block sm:hidden h-5 mr-5"
          />
          <Image
            onClick={() => router.push("/")}
            className="w-80px h-40px sm:w-100px sm:h-50px"
            src="/O.HI.O-logo.svg"
            width={100}
            height={50}
            alt="logo"
            priority={true}
          />

          <span className="ml-10px  sm:ml-20px flex items-center p-1 sm:px-2 rounded-full sm:rounded bg-gray-100">
            <MagnifyingGlassIcon className="text-gray-600 h-5" />
            <input
              placeholder="搜尋商品"
              type="search"
              className=" hidden sm:block bg-gray-100 rounded text-xs sm:text-sm p-1"
            />
          </span>
        </div>
        <nav>
          <ul className="flex items-center ml-5">
            <li className="hidden whitespace-nowrap md:block text-sm sm:text-md py-1 sm:py-2  px-5 mr-4 text-main-pink border-dashed border-2 border-main-pink rounded-md cursor-pointer  hover:border-light-blue hover:text-light-blue">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="/application"
                className=""
              >
                我想在 O.HI.O 上開店
              </Link>
            </li>
            <li
              className="px-2 cursor-pointer "
              onClick={() => router.push("/favorite?tab=products")}
            >
              <HeartIcon className="h-5 sm:h-7 text-gray-700 hover:text-main-pink" />
            </li>
            <li className="px-2 cursor-pointer ">
              {/* {isUserLoggedIn ? (
                <img
                  onClick={() => router.push("/my")}
                  src={currentUser.picture}
                  className="min-w-30px w-30px h-30px  sm:w-40px sm:h-40px rounded-full"
                />
              ) : (
                <UserIcon
                  onClick={() => router.push("/login")}
                  className="h-5 sm:h-7 text-gray-700 hover:text-main-pink"
                />
              )} */}
            </li>
            <li
              className="px-2 cursor-pointer relative "
              onClick={() => toCart()}
            >
              <span className="absolute top-0 transform -translate-y-1 min-w-20px min-h-20px flex items-center justify-center right-0 bg-main-pink text-white rounded-full text-xs sm:text-xs">
                {/* {totalItems} */}
              </span>
              <ShoppingBagIcon className="h-5 sm:h-7 text-gray-700 hover:text-main-pink" />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
