import { Link } from "react-router-dom";
import { images } from "../../assets/images";
import SelectInput from "../SelectInput/SelectInput";
import { useEffect, useRef } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: (
    value: boolean | ((prev: boolean | undefined) => boolean)
  ) => void;
};

const Profile = ({ isOpen, setIsOpen }: Props) => {
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={profileRef}
      className={
        isOpen
          ? "absolute top-19.25 shadow-[0_0_10px_silver] bg-[white] right-3 z-10 w-100 p-10 rounded-3xl dark:bg-[#1F2937] dark:text-white "
          : "hidden"
      }
    >
      <div className="flex items-center gap-1.5">
        <img src={images.profile} alt="" />

        <div>
          <h3>Your name</h3>
          <p>+998914572614</p>
        </div>
      </div>
      <div className="h-0.5 bg-[#E5E7EB] w-full"></div>
      <div className="flex items-center justify-between my-[24px]">
        <label>Tilni tanlang</label>
        <SelectInput />
      </div>
      <div className="h-0.5 bg-[#E5E7EB] w-full"></div>
      <div className="my-6">
        <Link to={""}>Qo'llab quvvatlash bo'limi</Link>
      </div>
    </div>
  );
};

export default Profile;
