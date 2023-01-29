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
import useScrollPosition from "@/hooks/useScrollPosition";

// import { toggleSideMenu } from "../../redux/actions/globalAction";
// import { addToFavorite } from "../../api/favoriteRequest";

const HIDE_LOGO_SCROLL_POSTIION = 50;

interface HeaderProps {}

interface SearchInputProps {
  className?: string;
}

const SearchInput = ({ className }: SearchInputProps) => {
  return (
    <div
      className={`${
        className || ""
      } flex items-center active:w-full focus-within:w-full p-1 px-4 sm:px-2 transition-all duration-500 rounded-full bg-gray-100`}
    >
      <MagnifyingGlassIcon className="text-gray-600 h-5" />
      <input
        placeholder="搜尋商品"
        type="search"
        className="sm:block w-full outline-none bg-gray-100 rounded text-xs sm:text-sm p-1"
      />
    </div>
  );
};

const Header = () => {
  const router = useRouter();

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const isSidebarOpen = useAppSelector((state) => state.global.isSidebarOpen);
  const logo = useAppSelector((state) => state.site.logo);
  const dispatch = useAppDispatch();

  const scrollPosition = useScrollPosition();
  console.log(router, "router");
  const isShowSearchInput = ["/", "/explore"].includes(router.pathname);
  const isScrollHeightExceedTarget = scrollPosition > HIDE_LOGO_SCROLL_POSTIION;

  return (
    <header className="border-b p-3 sm:p-4 fixed top-0 left-0 right-0 z-50 bg-white h-header-height-mobile sm:h-header-height-desktop">
      <div className="max-w-6xl mx-auto flex items-center justify-between relative h-full">
        <Bars2Icon
          onClick={() => dispatch(toggleSidebarOpen())}
          className={` transform transition-all duration-500 min-w-10px text-gray-700 cursor-pointer inline-block sm:hidden h-5 `}
        />
        <div
          className={` ${
            isShowSearchInput
              ? `${
                  isScrollHeightExceedTarget
                    ? "-translate-y-[64px] space-y-2"
                    : " -translate-y-1/4"
                }`
              : "-translate-y-1/2"
          } flex items-center w-full flex-col sm:flex-row top-1/2 absolute transition-all duration-500 left-1/2 transform -translate-x-1/2 sm:relative sm:translate-x-0 sm:translate-y-0 sm:top-auto sm:left-auto`}
        >
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
          <SearchInput
            className={`${
              isScrollHeightExceedTarget ? "w-1/2" : "w-full"
            } shadow-md ${isShowSearchInput ? "" : "hidden"} sm:hidden`}
          />
        </div>

        <nav>
          <ul className="flex items-center space-x-3">
            <li className="cursor-pointer hidden sm:block">
              <SearchInput />
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
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
