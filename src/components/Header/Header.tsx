import Image from "../Image";
import { Toggle } from "../Toggle/Toggle";

function Header({ setIsDark, isDark }) {
  return (
    <header className="border-[1px] rounded-[28px] p-2 border-[#cbc7c480] p-[24px] flex items-center justify-between">
      <Image name="darkLogo" />

      <div>
        <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
      </div>
    </header>
  );
}
export default Header;
