import Image from "../../../../components/Image/Image";
import type { HowItWorksItem } from "../../../Data";

type Props = {
  data: HowItWorksItem;
};

const HowItem = ({ data }: Props) => {
  const { icon, title, description, step, align } = data;

  return (
    <li
      className="flex flex-col md:flex-row items-center gap-6 mb-7.5 justify-between"
      style={{
        flexDirection: align === "right" ? "row-reverse" : "row", // desktopda align bo‘yicha row/reverse
      }}
    >
      <span className="font-general text-[50px] md:text-[108px] text-[#D0D8E4] font-medium leading-[60px] md:leading-[120px]">
        {step}
      </span>
      <div className="w-full bg-white p-4 md:p-[24px_35px] gap-4 flex items-center rounded-[20px] shadow-[10px_25px_100px_#002B6B75] flex-col md:flex-row">
        <div className="rounded-full w-[70px] md:w-[100px] p-2 md:p-4 bg-[#E1E9FE] flex items-center justify-center">
          <Image name={icon} />
        </div>

        <div className="text-center md:text-left">
          <h3 className="font-['General Sans'] font-bold text-[18px] md:text-[24px] text-[#1E242C]">
            {title}
          </h3>
          <p className="text-sm md:text-base">{description}</p>
        </div>
      </div>
    </li>
  );
};

export default HowItem;
