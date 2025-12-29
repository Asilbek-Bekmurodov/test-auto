import { Link } from "react-router-dom";
import type { CardsData } from "../../pages/Data";

interface CardsDataProps {
  data: CardsData[];
}

const Cards: React.FC<CardsDataProps> = ({ data }) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 p-[24px] ">
      {data.map((el) => (
        <Link key={el.id} to={el.path}>
          <li
            key={el.id}
            className="cursor-pointer h-50 bg-auto bg-no-repeat bg-position-[90%_90%] p-8  hover:shadow-[0_4px_8px_#3597F98F] border border-[#F2F2F3] rounded-[28px] dark:bg-[#0B142D] bg-[#FAFCFF]"
            style={{ backgroundImage: `url(${el.imgSrc})` }}
          >
            <h3 className="w-[300px] text-[24px] leading-5 font-medium uppercase leading-[30px] dark:text-white ">
              {el.title}
            </h3>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default Cards;
