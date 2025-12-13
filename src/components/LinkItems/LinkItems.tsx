import { FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Image from "../Image";
import { images } from "../../assets/images";
import type React from "react";

interface LinkItemsProps {
  icon: keyof typeof images;
  title: string;
  active: boolean;
  handleActive: (index: number) => void;
  index: number;
}

const LinkItems: React.FC<LinkItemsProps> = ({
  icon,
  title,
  active,
  handleActive,
  index,
}) => {
  return (
    <Link
      onClick={() => handleActive(index)}
      className={`rounded-xl  gap-4 flex items-center px-5 py-4  ${
        active && "bg-[#F5EFEB80]"
      }  pointer-fine border-[0.5px] border-[#F5EFEB80]`}
      to={"/"}
    >
      <Image name={icon} />
      <span className="text-[14xp] leading-5 font-semibold"> {title}</span>
      {active && <FaChevronRight />}
    </Link>
  );
};
export default LinkItems;
