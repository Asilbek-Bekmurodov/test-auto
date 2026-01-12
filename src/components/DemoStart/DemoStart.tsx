import { Link } from "react-router-dom";
import SelectInput from "../SelectInput/SelectInput";
import { images } from "../../assets/images";

const DemoStart = () => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(#0000003b, black), url(${images.autodrom})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4"
    >
      <div className="w-full max-w-md text-center flex flex-col items-center">
        <h2 className="text-white text-xl md:text-2xl font-semibold mb-6">
          Testni boshlashdan oldin iltimos tilni tanlang
        </h2>

        <div className="w-full mb-6">
          <SelectInput />
        </div>

        <Link
          to="/test/ticket/1"
          className="inline-block bg-gradient-to-r from-[#3597F9] to-[#462F8F] 
             text-white py-4 px-8 md:px-[35px] 
            rounded-[30px] text-lg md:text-[18px] 
            font-semibold transition-transform 
          transform hover:scale-105"
        >
          Testni boshlash
        </Link>
      </div>
    </div>
  );
};

export default DemoStart;
