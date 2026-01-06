import { Link } from "react-router-dom";
import { images } from "../../assets/images";
import SelectInput from "../SelectInput/SelectInput";
import { useEffect, useRef, useState } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
};

type UserData = {
  id: number;
  first_name: string;
  phone_number: string;
  last_name: string;
};
/* =====================
  COMPONENT
===================== */

const Profile = ({ isOpen, setIsOpen }: Props) => {
  const profileRef = useRef<HTMLDivElement>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  console.log(userData);

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
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  /* =====================
     TOKEN → DECODE → API
  ===================== */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("Token topilmadi");
      return;
    }

    try {
      // 2️⃣ API request (Bearer token bilan)
      fetch(`https://imtihongatayyorlov.pythonanywhere.com/auth/me/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("User olishda xatolik");
          }
          return res.json();
        })
        .then((data) => {
          setUserData(data.user);
        })
        .catch((err) => {
          console.error("API error:", err);
        });
    } catch (error) {
      console.error("Token decode xatosi:", error);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div
      ref={profileRef}
      className="absolute top-[60px] right-3 z-40 w-64 p-4 rounded-3xl shadow-lg bg-white dark:bg-[#1F2937] dark:text-white"
    >
      {/* User Info */}
      <div className="flex items-center gap-2 mb-3">
        <img
          src={images.profile}
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h3 className="font-semibold">
            {userData?.first_name ? userData?.first_name : "User"}
          </h3>
          <h3 className="font-semibold">
            {userData?.last_name ? userData.last_name : ""}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            {userData?.phone_number ? userData?.phone_number : "+998---------"}
          </p>
        </div>
      </div>

      <hr className="border-gray-200 dark:border-gray-600 mb-3" />

      {/* Language Select */}
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm">Tilni tanlang</label>
        <SelectInput />
      </div>

      <hr className="border-gray-200 dark:border-gray-600 mb-3" />

      {/* Support */}
      <div className="mb-2">
        <Link to="" className="text-sm text-blue-500 hover:underline">
          Qo'llab quvvatlash bo'limi
        </Link>
      </div>
    </div>
  );
};

export default Profile;
