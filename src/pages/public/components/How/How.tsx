import { images } from "../../../../assets/images";
import HowList from "../HowList/HowList";

const How = () => {
  return (
    <section
      className="how py-20 md:py-28 relative"
      style={{
        backgroundImage: `url(${images.how})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "calc(50% + 471px) calc(50% + 130px)",
        backgroundSize: "400px auto",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="w-full md:w-[55%]">
          <h2 className="mb-12 text-[#1E242C] text-4xl md:text-[56px] font-medium leading-[120%]">
            How It works
          </h2>
          <HowList />
        </div>
      </div>

      {/* Mobile responsive background */}
      <style>
        {`
          @media (max-width: 768px) {
            .how {
              background-position: center 100px;
              background-size: 250px auto;
            }
          }
        `}
      </style>
    </section>
  );
};

export default How;
