import React from "react";

import Carousel from "./carousel";
import Marquee from "./marquee";
import Image from "./image";
import ProductList from "./product-list";

interface ModulesType {
  module: {
    _type: string;
    data: {};
  };
}

const Modules = ({ module }: ModulesType) => {
  const ModuleType = {
    image: Image,
    marquee: Marquee,
    carousel: Carousel,
    productList: ProductList,
  }[module?._type] ?? <></>;

  // @ts-ignore
  return <ModuleType {...module.data} />;
};

export default Modules;
