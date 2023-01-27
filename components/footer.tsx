import React, { useState } from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="flex items-center flex-col bg-bg-white p-[30px] mt-[30px]">
      <Image
        className="sm:mb-2 mb-4"
        width={120}
        height={50}
        src={"/images/footer.svg"}
        alt="logo"
      />
      <p className="text-sm my-10px">
        © {new Date().getFullYear()} O.HI.O. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
