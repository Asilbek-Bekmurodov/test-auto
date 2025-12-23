import { images } from "../../../../assets/images";
import HowList from "../HowList/HowList";

const How = () => {
  return (
    <section
      className="how py-20"
      style={{
        backgroundImage: `url(${images.how})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "calc(50% + 471px) calc(50% + 130px)",
      }}
    >
      <div className="container m-auto ">
        <div className="w-[55%]">
          <h2 className="mb-12 text-[#1E242C] text-[56px] font-medium leading-[120%]">
            How It works
          </h2>
          <HowList />
        </div>
      </div>
    </section>
  );
};
export default How;
