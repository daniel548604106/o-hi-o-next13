import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import React from "react";
import Link from "next/link";
import { toggleSidebarOpen } from "@/redux/slices/globalSlice";
import { XMarkIcon } from "@heroicons/react/24/outline";
import classes from "./sidebar.module.css";

const Sidebar = () => {
  const { isSidebarOpen } = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();

  return (
    <div
      className={`${
        isSidebarOpen ? "" : "-translate-x-full"
      } w-full sm:w-[350px] h-[100vh] bg-white shadow-md fixed top-0 left-0 z-50 transform transition-all duration-500`}
    >
      <XMarkIcon
        onClick={() => dispatch(toggleSidebarOpen())}
        className={`fixed ${classes.fade} top-6 left-4 z-50 transform transition-all duration-500 min-w-10px text-gray-700 cursor-pointer inline-block sm:hidden h-5 `}
      />
    </div>
  );
};

export default Sidebar;
