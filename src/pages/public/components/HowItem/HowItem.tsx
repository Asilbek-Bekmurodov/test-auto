import Image from "../../../../components/Image/Image";
import type { HowItWorksItem } from "../../../Data";

type Props = {
  data: HowItWorksItem;
};
const HowItem = ({ data }: Props) => {
  const { icon, title, description, step, align } = data;
  return (
    <li
      className="flex items-center gap-6 mb-7.5 justify-between"
      style={{
        flexDirection: align === "right" ? "row-reverse" : "row",
        // justifySelf: "self-start",
      }}
    >
      <span className="font-general text-[108px] text-[#D0D8E4] font-medium leading-[120px]">
        {step}
      </span>
      <div className="w-full bg-white p-[24px_35px] gap-4 flex items-center rounded-[20px] shadow-[10px_25px_100px_#002B6B75]  ">
        <div className="rounded-full w-[100px] p-4 bg-[#E1E9FE] flex items-center justify-center">
          <Image  name={icon} />
        </div>

        <div >
          <h3 className="font-['General Sans'] font-bold text-[24px]  text-[#1E242C]">
            {title}
          </h3>
          <p>{description}</p>
        </div>
      </div>
    </li>
  );
};
export default HowItem;
