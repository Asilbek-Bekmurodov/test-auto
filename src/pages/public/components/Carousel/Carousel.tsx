import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import LessonGallery from "../LessonGallery/LessonGallery";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";

const Carousel = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="carousel py-20 md:py-30">
      <div className="container mx-auto px-4">
        <div className="mb-6 md:mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
          <h2 className="text-[28px] md:text-[56px] leading-[1.2] text-[#1E242C] font-medium">
            Dars jarayonidan lavhalar
          </h2>

          <div className="flex gap-3 md:gap-5">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="cursor-pointer p-3 md:p-4 bg-[#EDEEF0] rounded-full"
            >
              <FaArrowLeft size={16} />
            </button>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="cursor-pointer p-3 md:p-4 bg-[#374151] rounded-full"
            >
              <FaArrowRight color="white" size={16} />
            </button>
          </div>
        </div>

        <LessonGallery onSwiper={(swiper) => (swiperRef.current = swiper)} />
      </div>
    </section>
  );
};

export default Carousel;
