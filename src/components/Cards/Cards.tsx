import type { CardsData } from "../../pages/Data";

interface CardsDataProps {
  data: CardsData[];
}

const Cards: React.FC<CardsDataProps> = ({ data }) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 p-[24px] ">
      {data.map((el) => (
        <li
          key={el.id}
          className="cursor-pointer h-50 bg-auto bg-no-repeat bg-position-[90%_90%] p-8 shadow-[0_4px_4px_#00000040] hover:shadow-[0_4px_8px_#00000060] border border-[silver] rounded-[28px] dark:bg-[#0B142D]"
          style={{ backgroundImage: `url(${el.imgSrc})` }}
        >
          <h3 className="w-[300px] text-[24px] leading-5 font-medium uppercase leading-[30px] dark:text-white ">
            {el.title}
          </h3>
        </li>
      ))}
    </ul>
  );
};

export default Cards;
