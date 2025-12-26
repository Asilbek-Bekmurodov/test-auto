import { useState } from "react";
import { Link } from "react-router-dom";
import Image from "../../../../components/Image/Image";

const PublicHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="relative flex items-center justify-between py-4 md:py-5 rounded-[28px] px-3 md:px-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image name="darkLogo" className="w-24 md:w-32" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to={"/auth/login"}
              className="cursor-pointer border border-[#2422207A] rounded-[30px] px-4 md:px-6 py-2 md:py-3 text-[12px] md:text-[14px] font-extrabold text-[#2422207A] hover:bg-gray-100 transition"
            >
              Kirish
            </Link>
            <Link
              to={"/auth/register"}
              className="cursor-pointer border border-[#2422207A] rounded-[30px] px-4 md:px-6 py-2 md:py-3 text-[12px] md:text-[14px] font-extrabold text-[#2422207A] hover:bg-gray-100 transition"
            >
              Ro'yxatdan o'tish
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 bg-white rounded-lg shadow-lg py-4 flex flex-col items-center gap-3">
            <Link
              to={"/auth/login"}
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-3/4 text-center border border-[#2422207A] rounded-[30px] px-4 py-2 text-[14px] font-extrabold text-[#2422207A] hover:bg-gray-100 transition"
            >
              Kirish
            </Link>
            <Link
              to={"/auth/register"}
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-3/4 text-center border border-[#2422207A] rounded-[30px] px-4 py-2 text-[14px] font-extrabold text-[#2422207A] hover:bg-gray-100 transition"
            >
              Ro'yxatdan o'tish
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default PublicHeader;
