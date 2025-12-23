import { Link } from "react-router-dom";

import { images } from "../../../../assets/images";

const Hero = () => {
  return (
    <section
      className="hero py-30"
      style={{
        backgroundImage: `url(${images.hero}), url(${images.map})`,
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundPosition:
          "calc(50% + 440px) calc(50% + 100px), calc(50% + 404px) calc(50% + 100px)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="w-[50%]">
          <h1
            className="text-[56px] font-bold bg-gradient-to-r from-[#3597F9] to-[#462F8F]
  bg-clip-text text-transparent"
          >
            Hoziroq birinchi testni ishlab, bilimingizni sinab ko'ring
          </h1>
          <p className="text-[20px] font-light text-[] mt-5 mb-10 text-[#737373]">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi
            quis pariatur ullam animi accusamus?
          </p>
          <Link
            className="mt-[60px] bg-gradient-to-r from-[#3597F9] to-[#462F8F] text-white p-[20px_35px] rounded-[30px]"
            to={"/test"}
          >
            Testni boshlash
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Hero;
