import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { testimonials } from "./Data";
import Image from "../../../../components/Image/Image";

const AUTOPLAY_DELAY = 5000;

const TestimonialSlider = () => {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const current = testimonials[index];

  const prev = () => {
    setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));
  };

  // ▶ Autoplay
  useEffect(() => {
    if (hovered) return;

    const timer = setInterval(next, AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, [hovered, index]);

  // ⌨ Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-[56px] leading-snug md:leading-[120%] text-[#1E242C] font-medium mb-8 md:mb-10 text-center md:text-left">
          Mijozlarimizning fikri
        </h2>

        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-center"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* CONTENT */}
          <div className="h-[360px] md:h-[420px] relative rounded-3xl p-6 md:p-10 text-white bg-gradient-to-br from-indigo-700 to-blue-500 overflow-hidden flex flex-col justify-between">
            {/* Fade animation */}
            <div key={current.id} className="animate-fade-in">
              <p className="text-xs md:text-sm opacity-80 mb-4 md:mb-6">
                {current.name} • {current.role}
              </p>
            </div>{" "}
            <p className="text-xl md:text-2xl leading-relaxed mb-6 md:mb-10">
              “{current.text}”
            </p>
            {/* Buttons */}
            <div className="flex gap-3 md:gap-4">
              <button
                onClick={prev}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition"
              >
                <FaArrowLeft size={14} />
              </button>

              <button
                onClick={next}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-indigo-700 flex items-center justify-center hover:scale-105 transition"
              >
                <FaArrowRight size={14} />
              </button>
            </div>
            {/* Progress */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
              <div key={index} className="h-full bg-white animate-progress" />
            </div>
          </div>

          {/* IMAGE */}
          <div className="relative h-[360px] md:h-[420px] rounded-3xl overflow-hidden">
            <Image
              key={current.image}
              name={current.image}
              alt={current.name}
              className="w-full h-full object-cover animate-slide-in"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
