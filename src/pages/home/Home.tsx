import { useEffect, useState } from "react";
import LinkItems from "../../components/LinkItems/LinkItems";
import Header from "../../components/Header/Header";
import useLocalStorage from "use-local-storage";
import { Route, Routes } from "react-router-dom";
import Cards from "../../components/Cards";
import { cardsData, EducationCard, subPages, type SubPages } from "../Data";
import Payment from "../../components/Payment/Payment";
// qo'shil
function Home() {
  const [subPagesData, setSubPagesData] = useState<SubPages[]>(subPages);
  const preference: boolean = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const [isDark, setIsDark] = useLocalStorage<boolean>("isdark", preference);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const handleActive = (index: number) => {
    setSubPagesData((prev) =>
      prev.map((page, i) => ({
        ...page,
        active: i === index, // faqat bosilgan true, qolgan false
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
      <div className="w-75 h-[94vh] border border-[#cbc7c480]  mb-5 p-[24px] rounded-[28px] relative dark:bg-[#040A17] transition-colors duration-500 dark:border-[silver]">
        <h3 className="mb-12.25 text-[14px] font-semibold leading-[20px] dark:text-white">
          Sahifalar
        </h3>
        <div className="h-[0.5px] bg-[#c0c0c0] absolute left-0 top-[68px] w-full"></div>
        <ul className="flex flex-col gap-2 ">
          {subPagesData.map(({ icon, active, title, path }, index) => (
            <LinkItems
              key={index}
              index={index}
              handleActive={handleActive}
              icon={icon}
              active={active}
              title={title}
              path={path}
            />
          ))}
        </ul>
      </div>
      <div className="w-full h-[94vh] overflow-scroll">
        <Header isDark={isDark} setIsDark={setIsDark} />

        <Routes>
          <Route path="/" element={<Cards data={cardsData} />} />
          <Route path="/education" element={<Cards data={EducationCard} />} />
          <Route path="/problems" element={<Cards data={cardsData} />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>
    </div>
  );
}
export default Home;
