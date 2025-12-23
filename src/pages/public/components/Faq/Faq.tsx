import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { FAQItem } from "../../../Data";
import { faqs } from "./Data";
import Image from "../../../../components/Image/Image";

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="faq">
      <div className="container mx-auto py-30">
        <h2 className="text-[56px] leading-[120%] text-[#1E242C] font-medium mb-10">
          Eng ko’p beriladigan savollar
        </h2>

        {/* 👇 MUHIM QISM — MASONRY LAYOUT */}
        <div className="columns-1 md:columns-2 gap-6">
          {faqs.map((faq: FAQItem, index: number) => {
            const isOpen = activeIndex === index;

            return (
              <motion.div
                key={index}
                layout
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className={`
                  mb-6 break-inside-avoid rounded-xl overflow-hidden
                  ${
                    isOpen
                      ? "bg-[#E6F0FF] border border-[#8AB9FF] shadow-[0_10px_50px_0px_#002B6B40]"
                      : "bg-white border border-gray-300"
                  }
                `}
              >
                {/* QUESTION */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-4 text-left text-lg font-medium h-[100px]"
                >
                  <div className="flex items-center gap-2">
                    <span className="p-3 rounded-full bg-[#EDEEF0] text-sm font-medium text-[#002B6B]">
                      0{index + 1}
                    </span>
                    {faq.question}
                  </div>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image name="star" />
                  </motion.span>
                </button>

                {/* ANSWER */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden px-4 bg-[#E6F0FF]"
                    >
                      <motion.p
                        initial={{ y: -6 }}
                        animate={{ y: 0 }}
                        exit={{ y: -6 }}
                        transition={{ duration: 0.25 }}
                        className="text-gray-600 py-4"
                      >
                        {faq.answer}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
