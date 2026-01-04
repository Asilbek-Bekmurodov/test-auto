// Profile.tsx
import { Link } from "react-router-dom";
import { images } from "../../assets/images";
import SelectInput from "../SelectInput/SelectInput";
import { useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";

/* =====================
   TYPES
===================== */

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
};

interface JwtPayload {
  user_id: number;
  exp: number;
}

/* =====================
   COMPONENT
===================== */

const Profile = ({ isOpen, setIsOpen }: Props) => {
  const profileRef = useRef<HTMLDivElement>(null);

  /* =====================
     OUTSIDE CLICK
  ===================== */
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
      // 1️⃣ Decode token
      const decoded = jwtDecode<JwtPayload>(token);
      console.log("Decoded token:", decoded);

      const userId = decoded.user_id;

      // 2️⃣ API request (Bearer token bilan)
      fetch(
        `https://imtihongatayyorlov.pythonanywhere.com/users/users/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("User olishda xatolik");
          }
          return res.json();
        })
        .then((data) => {
          console.log("USER DATA:", data);
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
          <h3 className="font-semibold">Your name</h3>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            +998*********
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
