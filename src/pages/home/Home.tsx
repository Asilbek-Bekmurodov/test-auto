import useLocalStorage from "use-local-storage";
import { motion } from "framer-motion";
import LinkItems from "../../components/LinkItems/LinkItems";
import Header from "../../components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Cards from "../../components/Cards";
import { cardsData, EducationCard, subPages, type SubPages } from "../Data";
import Payment from "../../components/Payment/Payment";
import { TicketGrid } from "../../components/TickedGrid/TickedGrid";
import { useTheme } from "../../context/ThemeContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useState } from "react";
import { NewsGrid } from "../../components/News/NewsGrid";
import ShowProblems from "../../components/Problems/ShowProblems";

function Home() {
  const [subPagesData, setSubPagesData] = useState<SubPages[]>(subPages);
  const { isDark, setIsDark } = useTheme();

  // 🚀 use-local-storage kutubxonasi bilan toggle
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
      className={
        isDark
          ? "dark flex p-3 gap-3 dark:bg-[#050C1D] transition-colors duration-500"
          : "flex p-3 gap-3"
      }
    >
      {/* SIDEBAR */}
      <motion.div
        animate={{ width: toggle ? 300 : 120 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`relative h-[94vh] border border-[#cbc7c480] mb-5 p-[12px] md:p-[24px] rounded-[28px] 
        dark:bg-[#0B142D] transition-colors duration-500 dark:border-[silver]`}
      >
        <button
          onClick={() => setToggle(!toggle)}
          className="absolute -right-4 top-23 p-2 border border-[#cbc7c480] bg-white rounded-full dark:bg-[#040A17]"
        >
          {toggle ? (
            <FaChevronRight className="text-gray-800 dark:text-white cursor-pointer z-10" />
          ) : (
            <FaChevronLeft className="text-gray-800 dark:text-white cursor-pointer z-10" />
          )}
        </button>

        <h3 className="mb-12.25 text-[14px] font-semibold leading-[20px] dark:text-white">
          Sahifalar
        </h3>

        <div className="h-[0.5px] bg-[#c0c0c0] absolute left-0 top-[68px] w-full"></div>

        <ul className="flex flex-col gap-2 pt-7">
          {subPagesData.map(
            ({ icon, active, title, path, darkIcon }, index) => (
              <LinkItems
                key={index}
                index={index}
                handleActive={handleActive}
                icon={icon}
                active={active}
                title={title}
                path={path}
                isDark={isDark}
                darkIcon={darkIcon}
                toggle={toggle}
              />
            )
          )}
        </ul>
      </motion.div>

      {/* CONTENT */}
      <div className="w-full h-[94vh] overflow-scroll">
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
    </div>
  );
}

export default Home;
