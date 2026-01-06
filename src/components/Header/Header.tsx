// Header.tsx
import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Image from "../Image/Image";
import Profile from "../Profile/Profile";
import { Toggle } from "../Toggle/Toggle";

type HeaderProps = {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  timeLeft?: number;
  increaseFont?: () => void;
  decreaseFont?: () => void;
  onFinish?: () => void; // 👈 YANGI
};

const Header = ({
  isDark,
  setIsDark,
  timeLeft,
  increaseFont,
  decreaseFont,
  onFinish,
}: HeaderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="relative border rounded-[20px] p-4 border-[#cbc7c480] flex items-center justify-between bg-white dark:bg-[#0B142D] ">
      <Link className="hidden md:inline-block" to={"/home"}>
        <Image name={isDark ? "logoWhite" : "darkLogo"} />
      </Link>

      {/* Timer */}
      <div className="flex gap-3 items-center">
        {timeLeft && (
          <div className="text-right text-lg font-semibold dark:text-white">
            ⏱ {Math.floor(timeLeft / 60)}:
            {String(timeLeft % 60).padStart(2, "0")}
          </div>
        )}
        {onFinish && (
          <button
            onClick={onFinish}
            className="bg-red-600 curpo hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
          >
            Yakunlash
          </button>
        )}
      </div>

      <div className="flex gap-3 items-center">
        {/* Font Size Controls */}
        {decreaseFont && increaseFont && (
          <div className="flex gap-2 dark:text-white">
            <button
              onClick={decreaseFont}
              className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
            >
              A-
            </button>
            <button
              onClick={increaseFont}
              className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
            >
              A+
            </button>
          </div>
        )}

        {/* Right Controls */}
        {/* Right Controls */}
        <div className="relative flex items-center gap-3">
          {/* YAKUNLASH BUTTON */}

          {/* Dark Mode Toggle */}
          <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />

          {/* Profile Icon */}
          <FaRegUserCircle
            size={26}
            className="cursor-pointer z-50 text-black dark:text-white"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen((prev) => !prev);
            }}
          />

          {/* Profile Dropdown */}
          <Profile isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </header>
  );
};

export default Header;
