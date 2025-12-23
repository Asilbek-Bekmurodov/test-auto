import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.css";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";

import { lessonMediaData } from "../Carousel/Data";
import VideoModal from "../VideoModal/VideoModal";
import Image from "../../../../components/Image/Image";

type Props = {
  onSwiper: (swiper: SwiperType) => void;
};

const LessonGallery = ({ onSwiper }: Props) => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <>
      <Swiper
        onSwiper={onSwiper} // 👈 MUHIM
        spaceBetween={20}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {lessonMediaData.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative h-[460px] rounded-2xl overflow-hidden">
              <Image
                className="w-full h-full object-cover"
                alt={item.author}
                name={item.image}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-5 flex flex-col justify-end">
                <p className="text-white font-semibold">{item.author}</p>
                <p className="text-white/70 text-sm">{item.role}</p>

                {item.videoUrl && (
                  <button
                    onClick={() => setActiveVideo(item.videoUrl!)}
                    className="absolute bottom-5 right-5 w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center text-white"
                  >
                    ▶
                  </button>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {activeVideo && (
        <VideoModal
          videoUrl={activeVideo}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </>
  );
};

export default LessonGallery;
