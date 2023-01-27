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
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { toggleSidebarOpen } from "@/redux/slices/globalSlice";

// import { toggleSideMenu } from "../../redux/actions/globalAction";
// import { addToFavorite } from "../../api/favoriteRequest";

interface HeaderProps {}
const Header = () => {
  const router = useRouter();

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const isSidebarOpen = useAppSelector((state) => state.global.isSidebarOpen);
  const logo = useAppSelector((state) => state.site.logo);
  const dispatch = useAppDispatch();

  const SideBarIcon = isSidebarOpen ? XMarkIcon : Bars2Icon;

  return (
    <header className="border-b p-3 sm:p-4">
      <div className="max-w-6xl h-60px mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <Image
              onClick={() => router.push("/")}
              className="w-20 h-10 sm:w-[100px] sm:h-[50px] object-contain"
              src={logo || "/O.HI.O-logo.svg"}
              width={100}
              height={50}
              alt="logo"
              priority={true}
            />
          </Link>
        </div>

        <nav>
          <ul className="flex items-center space-x-3">
            <li className="ml-10px flex items-center p-1 sm:px-2 rounded-full sm:rounded bg-gray-100">
              <MagnifyingGlassIcon className="text-gray-600 h-5" />
              <input
                placeholder="搜尋商品"
                type="search"
                className=" hidden sm:block bg-gray-100 rounded text-xs sm:text-sm p-1"
              />
            </li>
            <li className="cursor-pointer ">
              <Link href={isLoggedIn ? "/account" : "/auth"}>
                <UserIcon className="h-5 sm:h-7 text-gray-700 hover:text-main-pink" />
              </Link>
            </li>
            <li className="cursor-pointer relative ">
              <Link href="/cart">
                <span className="absolute top-0 transform -translate-y-1 min-w-20px min-h-20px flex items-center justify-center right-0 bg-main-pink text-white rounded-full text-xs sm:text-xs">
                  {/* {totalItems} */}
                </span>
                <ShoppingBagIcon className="h-5 sm:h-7 text-gray-700 hover:text-main-pink" />
              </Link>
            </li>
            <li onClick={() => dispatch(toggleSidebarOpen())}>
              <SideBarIcon
                className={`${
                  isSidebarOpen ? "fixed top-6 right-4 z-50 opacity-1" : ""
                } transform transition-all duration-500 min-w-10px text-gray-700 cursor-pointer inline-block sm:hidden h-5 `}
              />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
