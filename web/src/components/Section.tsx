import { Card } from "../components/Card";
import { useMediaQuery } from "react-responsive";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/pagination';

import { Navigation } from "swiper/modules";

interface DataProps {
  id: number
  name: string
  description: string
  category: string
  price: number
  image: string
}

interface SectionProps {
  title: string;
  data: DataProps[]
  categoryType: string

}

export function Section({ title, data, categoryType }: SectionProps) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const filter = data.filter(product => product.category === categoryType)

  const filteredProducts = categoryType === 'all' ? data : filter

  const slidesPerView = isMobile ? 2 : 4;
  const isCentered = isMobile ? true : false;

  return (
    <div className="md:max-w-[70rem] md:mx-auto mt-16 md:mt-12">
      <h1 className="font-poppins md:text-3xl ml-6 md:ml-0 text-light-300 font-medium mb-4">
        {title}
      </h1>

      <Swiper
        navigation={true}
        modules={[Navigation]}
        slidesPerView={slidesPerView}
        centeredSlides={isCentered}
        spaceBetween={10}
        loop={true}


        className="mySwiper"
        watchSlidesProgress
      >
        {filteredProducts.map(product => (
          <SwiperSlide key={product.id}>
            <Card product={product} />
          </SwiperSlide>
        )
        )}
      </Swiper>
    </div>
  );
}
