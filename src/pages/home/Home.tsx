import { useEffect, useState } from "react";
import { images } from "../../assets/images";
import LinkItems from "../../components/LinkItems/LinkItems";
import Header from "../../components/Header/Header";
import useLocalStorage from "use-local-storage";

interface SubPages {
  icon: keyof typeof images;
  title: string;
  active: boolean;
}

const subPages: SubPages[] = [
  {
    icon: "boshSahifa",
    title: "Bosh sahifa",
    active: true,
  },
  {
    icon: "tolov",
    title: "To’lovlar",
    active: false,
  },
  {
    icon: "yangilik",
    title: "Yangiliklar",
    active: false,
  },
  {
    icon: "xato",
    title: "Xatoliklar",
    active: false,
  },
];

function Home() {
  const [subPagesData, setSubPagesData] = useState<SubPages[]>(subPages);
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isdark", preference);

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
      <div className="w-75 h-[94vh] border-[1px] mb-5 p-[24px] rounded-[28px] relative dark:bg-[#040A17] transition-colors duration-500">
        <h3 className="mb-12.25 text-[14px] font-semibold leading-[20px] dark:text-white">
          Sahifalar
        </h3>
        <div className="h-[0.5px] bg-[silver] absolute left-0 top-[68px] w-full"></div>
        <ul className="flex flex-col gap-2 ">
          {subPagesData.map(({ icon, active, title }, index) => (
            <LinkItems
              key={index}
              index={index}
              handleActive={handleActive}
              icon={icon}
              active={active}
              title={title}
            />
          ))}
        </ul>
      </div>
      <div className="w-full h-[94vh]">
        <Header isDark={isDark} setIsDark={setIsDark} />
      </div>
    </div>
  );
}
export default Home;
