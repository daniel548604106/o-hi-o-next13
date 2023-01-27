import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Banner } from "@/interfaces";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface BannerProps {
  banners: Banner[];
}

const Banners = ({ banners }: BannerProps) => {
  console.log(banners, "banners,");
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      loop
      pagination={{ clickable: true }}
    >
      {banners?.map(({ image, link, title }) => {
        const startsWithSlashRegex = /^\//;
        const isExternalLink = !startsWithSlashRegex.test(link);
        return (
          <SwiperSlide
            className="relative w-full aspect-video sm:aspect-[5/2]"
            key={image}
          >
            <Link href={link} target={isExternalLink ? "_blank" : ""}>
              <Image src={image} alt={title} className="object-cover" fill />
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Banners;
