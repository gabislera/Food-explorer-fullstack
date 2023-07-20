import { Card } from "../components/Card";
import { useMediaQuery } from "react-responsive";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

interface SectionProps {
  title: string;
}

export function Section({ title }: SectionProps) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const slidesPerView = isMobile ? 2 : 4;
  const isCentered = isMobile ? true : false;

  return (
    <div className="md:max-w-[70rem] md:mx-auto mt-16 md:mt-12">
      <h1 className="font-poppins md:text-3xl ml-6 md:ml-0 text-light-300 font-medium">
        {title}
      </h1>

      <Swiper
        navigation={true}
        modules={[Navigation]}
        slidesPerView={slidesPerView}
        centeredSlides={isCentered}
        spaceBetween={10}
        className="mySwiper"
        watchSlidesProgress
      >
        <SwiperSlide>
          <Card />
        </SwiperSlide>
        <SwiperSlide>
          <Card />
        </SwiperSlide>
        <SwiperSlide>
          <Card />
        </SwiperSlide>
        <SwiperSlide>
          <Card />
        </SwiperSlide>
        <SwiperSlide>
          <Card />
        </SwiperSlide>
        <SwiperSlide>
          <Card />
        </SwiperSlide>
        <SwiperSlide>
          <Card />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
