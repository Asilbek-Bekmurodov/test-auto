import { Link } from "react-router-dom";
import Image from "../../../../components/Image/Image";

const PublicHeader = () => {
  return (
    <header className="fixed top-0 w-full bg-white header p-5 ">
      <div className="container mx-auto px-4">
        <div className="relative rounded-[28px] p-[8px] flex items-center justify-between">
          <Image name="darkLogo" />
          <div className="relative flex items-center gap-3">
            <Link
              to={"/auth/login"}
              className="cursor-pointer border border-[#2422207A] rounded-[30px] px-[18px] py-[10px] text-[14px] font-extrabold text-[#2422207A]"
            >
              Kirish
            </Link>
            <Link
              to={"/auth/register"}
              className="cursor-pointer border border-[#2422207A] rounded-[30px] px-[18px] py-[10px] text-[14px] font-extrabold text-[#2422207A]"
            >
              Ro'yxatdan o'tish
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
export default PublicHeader;
