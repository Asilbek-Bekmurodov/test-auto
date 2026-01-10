import { Link } from "react-router-dom";
import { images } from "../../assets/images";

import { useEffect, useRef, useState } from "react";
import SelectInput from "../SelectInput/SelectInput";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
};

type UserData = {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
};

const Profile = ({ isOpen, setIsOpen, triggerRef }: Props) => {
  const profileRef = useRef<HTMLDivElement>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // 🔹 Profile ichida bo‘lsa
      if (profileRef.current?.contains(target)) return;

      // 🔹 Trigger (avatar button) bosilsa
      if (triggerRef.current?.contains(target)) return;

      // 🔹 AntD Select dropdown bosilsa (MUHIM QATOR)
      if (target.closest(".ant-select-dropdown")) return;

      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, triggerRef, setIsOpen]);
  /* API USER */
  useEffect(() => {
    if (!isOpen) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("https://imtihongatayyorlov.pythonanywhere.com/auth/me/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUserData(data.user))
      .catch(console.error);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* OVERLAY */}
      <div
        className="fixed inset-0 bg-black/30 z-[998]"
        onClick={() => setIsOpen(false)}
      />

      {/* CARD */}
      <div
        ref={profileRef}
        className="fixed top-20 right-4 z-[999] w-64 p-4 rounded-3xl shadow-xl
        bg-white dark:bg-[#1F2937] dark:text-white"
      >
        <div className="flex gap-3 mb-3">
          <img src={images.profile} className="w-10 h-10 rounded-full" />
          <div>
            <h3 className="font-semibold">{userData?.first_name || "User"}</h3>
            <h3 className="font-semibold">{userData?.last_name || ""}</h3>
            <p className="text-sm text-gray-400">
              {userData?.phone_number || "+998---------"}
            </p>
          </div>
        </div>

        <hr className="my-3" />
        <div className="flex justify-between mb-3">
          {/* <span>Til</span> */}
          <SelectInput />
        </div>
        <hr className="my-3" />

        <Link to="" className="text-sm text-blue-500 hover:underline">
          Qo‘llab-quvvatlash
        </Link>
      </div>
    </>
  );
};

export default Profile;
