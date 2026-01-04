import { useNavigate } from "react-router-dom";
import type { CardsData } from "../../pages/Data";

interface CardsDataProps {
  data: CardsData[];
}

const Cards: React.FC<CardsDataProps> = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Agar token yo'q bo'lsa, login sahifasiga yo'naltirish
      navigate("/auth/login");
      return;
    }

    // Token mavjud bo'lsa, kerakli pathga o'tish
    navigate(path);
  };

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 p-[24px]">
      {data.map((el) => (
        <li
          key={el.id}
          className="cursor-pointer h-35 lg:h-50 p-4 lg:p-8 bg-auto bg-no-repeat bg-position-[110%_120%]  hover:shadow-[0_4px_8px_#3597F98F] border border-[#F2F2F3] rounded-[28px] dark:bg-[#0B142D] bg-[#FAFCFF]"
          style={{
            backgroundImage: `url(${el.imgSrc})`,
            backgroundSize: "60% 80%",
          }}
          onClick={() => handleClick(el.path)}
        >
          <h3 className="text-[13px] sm:text-[13px]  md:text-[20px] lg:text-[24px] leading-5 font-medium uppercase leading-[30px] dark:text-white">
            {el.title}
          </h3>
        </li>
      ))}
    </ul>
  );
};

export default Cards;
