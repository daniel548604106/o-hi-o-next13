import { useState } from "react";

import Image from "next/image";
import { Navigation, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SlideShowImage = ({
  src,
  alt,
}: {
  src: string;
  alt: string;
}): JSX.Element => (
  <div className="w-full aspect-square">
    <Image alt={alt} fill src={src} />
  </div>
);

export interface SlideImage {
  src: string;
}

const ImageSlider = ({
  slideImages = [],
  initialSlide = 0,
  isSlideModalOpen,
  setSlideModalOpen,
}: {
  slideImages: SlideImage[];
  initialSlide?: number;
  isSlideModalOpen: boolean;
  setSlideModalOpen: (boolean: boolean) => void;
}) => {
  const [activeSlide, setActiveSlide] = useState<number>(1);

  const pages = [
    ...slideImages?.map(({ src }) => ({
      id: src,
      component: <SlideShowImage src={src} alt={src} />,
    })),
  ];
  return (
    <div
      aria-hidden="true"
      className={`${
        isSlideModalOpen &&
        "fixed top-0 flex items-center justify-between z-40 h-screen w-screen bg-[#000]"
      }`}
      onClick={(): void => {
        setSlideModalOpen(true);
      }}
    >
      {isSlideModalOpen && (
        <>
          <span className="fixed text-white top-10 text-center w-screen  z-40">{`${activeSlide}/${slideImages.length}`}</span>
          <XMarkIcon
            onClick={(e) => {
              e.stopPropagation();
              setSlideModalOpen(false);
            }}
            className="top-3 right-3 text-white fixed z-40 w-8 h-8"
          />
        </>
      )}

      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        initialSlide={initialSlide}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {pages.map((page) => (
          <SwiperSlide key={page.id}>{page.component}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
