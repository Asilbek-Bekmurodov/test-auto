import { Link } from "react-router-dom";
import { images } from "../../../../assets/images";

const Hero = () => {
  return (
    <section
      className="hero py-20 md:py-30 relative "
      style={{
        backgroundImage: `url(${images.hero}), url(${images.map})`,
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundPosition:
          "calc(50% + 440px) calc(50% + 100px), calc(50% + 404px) calc(50% + 100px)",
      }}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center md:items-start">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className=" text-4xl md:text-[45px] font-bold bg-gradient-to-r from-[#3597F9] to-[#462F8F] bg-clip-text text-transparent">
            Hoziroq birinchi testni ishlab, bilimingizni sinab ko'ring
          </h1>
          <p className="text-base md:text-[20px] font-light mt-5 mb-8 text-[#737373]">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi
            quis pariatur ullam animi accusamus?
          </p>
          <Link
            to="/test/ticket/1"
            className="inline-block mt-4 md:mt-[60px] bg-gradient-to-r from-[#3597F9] to-[#462F8F] text-white py-4 px-8 md:px-[35px] rounded-[30px] text-lg md:text-[18px] font-semibold transition-transform transform hover:scale-105"
          >
            Testni boshlash
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
