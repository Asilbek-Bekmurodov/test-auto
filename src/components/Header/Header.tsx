import { useState } from "react";
import Image from "../Image/Image";
import Profile from "../Profile/Profile";
import { Toggle } from "../Toggle/Toggle";
import { FaRegUserCircle } from "react-icons/fa";

type HeaderProps = {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
};

const Header = ({ isDark, setIsDark }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="relative border rounded-[20px] p-4 border-[#cbc7c480] flex items-center justify-between">
      <Image name="darkLogo" />
      <div className="relative flex items-center">
        <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
        <FaRegUserCircle size={26} onClick={() => setIsOpen(!isOpen)} />
      </div>
      <Profile isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};

export default Header;
