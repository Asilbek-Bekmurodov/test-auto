import Image from "../Image";
import { Toggle } from "../Toggle/Toggle";

type Props = {
  isDark: boolean;
  setIsDark: (
    value: boolean | ((prev: boolean | undefined) => boolean)
  ) => void;
};

const Header = ({ isDark, setIsDark }: Props) => {
  return (
    <header className="relative border-[1px] rounded-[28px] p-2 border-[#cbc7c480] p-[24px] flex items-center justify-between">
      <Image name="darkLogo" />
      <div>
        <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
      </div>
    </header>
  );
};

export default Header;
