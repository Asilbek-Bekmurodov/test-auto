import { useState } from "react";
import Image from "../Image/Image";
import Profile from "../Profile/Profile";
import { Toggle } from "../Toggle/Toggle";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

type HeaderProps = {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  timeLeft: number;
  increaseFont: () => void;
  decreaseFont: () => void;
};

const Header = ({
  isDark,
  setIsDark,
  timeLeft,
  increaseFont,
  decreaseFont,
}: HeaderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="relative border rounded-[20px] p-4 border-[#cbc7c480] flex items-center justify-between">
      <Link to={"/home"}>
        <Image name="darkLogo" />
      </Link>

      {/* Timer */}
      <div className="text-right text-lg font-semibold">
        ⏱ {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
      </div>
      <div className="flex gap-3">
        <div className="flex gap-3">
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
        {/* Right controls */}
        <div className="relative flex items-center gap-3">
          {/* Accessibility */}

          {/* Dark mode */}
          <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />

          {/* Profile */}
          <FaRegUserCircle
            size={26}
            className="cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>

        <Profile isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </header>
  );
};

export default Header;
