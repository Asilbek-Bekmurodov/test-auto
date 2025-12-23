import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import LessonGallery from "../LessonGallery/LessonGallery";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";

const Carousel = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="carousel py-30">
      <div className="container mx-auto px-2">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-[56px] leading-[120%] text-[#1E242C] font-medium">
            Dars jarayonidan lavhalar
          </h2>

          <div className="flex gap-5">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="cursor-pointer p-4 bg-[#EDEEF0] rounded-full"
            >
              <FaArrowLeft />
            </button>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="cursor-pointer p-4 bg-[#374151] rounded-full"
            >
              <FaArrowRight color="white" />
            </button>
          </div>
        </div>

        <LessonGallery onSwiper={(swiper) => (swiperRef.current = swiper)} />
      </div>
    </section>
  );
};

export default Carousel;
