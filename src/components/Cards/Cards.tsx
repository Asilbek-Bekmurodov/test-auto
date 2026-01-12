import { useNavigate } from "react-router-dom";
import type { CardsData } from "../../pages/Data";
import { useTranslation } from "react-i18next";

interface CardsDataProps {
  data: CardsData[];
}

const Cards: React.FC<CardsDataProps> = ({ data }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = (path?: string) => {
    if (!path) return;

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/auth/login");
      return;
    }

    navigate(path);
  };

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 p-[24px]">
      {data.map((el) => {
        const isDisabled = !el.path;

        return (
          <li
            key={el.id}
            onClick={() => handleClick(el.path)}
            className={`
              relative h-35 lg:h-50 p-4 lg:p-8 rounded-[28px]
              bg-no-repeat bg-auto bg-position-[110%_120%]
              dark:bg-[#0B142D] bg-[#FAFCFF]
              transition
              ${
                isDisabled
                  ? "cursor-not-allowed opacity-70"
                  : "cursor-pointer hover:shadow-[0_4px_8px_#3597F98F]"
              }
            `}
            style={{
              backgroundImage: `url(${el.imgSrc})`,
              backgroundSize: "60% 80%",
            }}
          >
            <h3 className="text-[13px] sm:text-[13px] md:text-[20px] lg:text-[24px] font-medium uppercase leading-[30px] dark:text-white">
              {t(el.title)}
            </h3>

            {/* Overlay */}
            {isDisabled && (
              <div className="absolute inset-0 rounded-[28px] bg-black/60 flex items-center justify-center">
                <span className="text-white text-sm sm:text-base font-semibold">
                  {t("soon")}
                </span>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Cards;
