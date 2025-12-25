import { howItWorksData } from "../../../Data";
import HowItem from "../HowItem/HowItem";

const HowList = () => {
  return (
    <ul className="">
      {howItWorksData.map((item) => (
        <HowItem key={item.id} data={item} />
      ))}
    </ul>
  );
};
export default HowList;
