import useLocalStorage from "use-local-storage";
import { motion, AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa6";

import LinkItems from "../../components/LinkItems/LinkItems";
import Header from "../../components/Header/Header";
import Cards from "../../components/Cards";
import Payment from "../../components/Payment/Payment";
import { TicketGrid } from "../../components/TickedGrid/TickedGrid";
import { NewsGrid } from "../../components/News/NewsGrid";
import ShowProblems from "../../components/Problems/ShowProblems";

import { cardsData, EducationCard, subPages, type SubPages } from "../Data";
import { useTheme } from "../../context/ThemeContext";

function Home() {
  const { isDark, setIsDark } = useTheme();
  const [subPagesData, setSubPagesData] = useState<SubPages[]>(subPages);

  // sidebar holati (localStorage)
  const [toggle, setToggle] = useLocalStorage<boolean>("sidebarToggle", false);

  const handleActive = (index: number) => {
    setSubPagesData((prev) =>
      prev.map((page, i) => ({
        ...page,
        active: i === index,
      }))
    );
  };

  return (
    <div
      className={`flex p-3 gap-3 min-h-screen transition-colors duration-500 ${
        isDark ? "dark bg-[#050C1D]" : ""
      }`}
    >
      {/* ================= DESKTOP SIDEBAR ================= */}
      <motion.div
        animate={{ width: toggle ? 300 : 120 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="hidden md:block relative h-[94vh] border border-[#cbc7c480] mb-5 p-[12px] md:p-[24px] rounded-[28px]
        dark:bg-[#0B142D] dark:border-[silver]"
      >
        {/* toggle */}
        <button
          onClick={() => setToggle(!toggle)}
          className="absolute -right-4 top-24 p-2 border border-[#cbc7c480] bg-white rounded-full dark:bg-[#040A17]"
        >
          {toggle ? (
            <FaChevronRight className="dark:text-white" />
          ) : (
            <FaChevronLeft className="dark:text-white" />
          )}
        </button>

        <h3 className="mb-12 text-[14px] font-semibold dark:text-white">
          Sahifalar
        </h3>

        <div className="h-[0.5px] bg-[#c0c0c0] absolute left-0 top-[68px] w-full" />

        <ul className="flex flex-col gap-2 pt-7">
          {subPagesData.map((item, index) => (
            <LinkItems
              key={index}
              index={index}
              handleActive={handleActive}
              {...item}
              isDark={isDark}
              toggle={toggle}
            />
          ))}
        </ul>
      </motion.div>

      {/* ================= CONTENT ================= */}
      <div className="w-full h-[94vh] overflow-y-auto">
        <Header isDark={isDark} setIsDark={setIsDark} />

        <Routes>
          <Route path="/" element={<Cards data={cardsData} />} />
          <Route path="/education" element={<Cards data={EducationCard} />} />
          <Route path="/problems" element={<ShowProblems />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/biletlar" element={<TicketGrid />} />
          <Route path="/news" element={<NewsGrid />} />
        </Routes>
      </div>

      {/* ================= MOBILE OVERLAY ================= */}
      <AnimatePresence>
        {toggle && (
          <motion.div
            onClick={() => setToggle(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* ================= MOBILE SIDEBAR (BOTTOM) ================= */}
      <AnimatePresence>
        {toggle && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed md:hidden bottom-0 left-0 w-full z-50
            bg-white dark:bg-[#0B142D] rounded-t-3xl border-t border-[#cbc7c480]"
          >
            <div className="p-4">
              <h3 className="text-center mb-4 text-sm font-semibold dark:text-white">
                Sahifalar
              </h3>

              <ul className="flex flex-col gap-2">
                {subPagesData.map((item, index) => (
                  <LinkItems
                    key={index}
                    index={index}
                    handleActive={handleActive}
                    {...item}
                    isDark={isDark}
                    toggle={true}
                  />
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= MOBILE TOGGLE BUTTON ================= */}
      <button
        onClick={() => setToggle(!toggle)}
        className="fixed md:hidden bottom-5 right-5 z-50
        bg-[#050C1D] dark:bg-[#0B142D] text-white p-4 rounded-full shadow-xl"
      >
        {toggle ? <FaChevronDown /> : <FaChevronUp />}
      </button>
    </div>
  );
}

export default Home;
