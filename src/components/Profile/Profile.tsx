import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);

  /* ===============================
     CLICK OUTSIDE
  =============================== */
  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (profileRef.current?.contains(target)) return;
      if (triggerRef.current?.contains(target)) return;
      if (target.closest(".ant-select-dropdown")) return;

      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, triggerRef, setIsOpen]);

  /* ===============================
     FETCH USER DATA
  =============================== */
  useEffect(() => {
    if (!isOpen) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    let isMounted = true;

    const fetchUser = async () => {
      try {
        const res = await fetch(
          "https://imtihongatayyorlov.pythonanywhere.com/auth/me/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Unauthorized");
        }

        const data = await res.json();
        if (isMounted) {
          setUserData(data.user);
        }
      } catch (error) {
        console.error(error);

        if (isMounted) {
          localStorage.removeItem("token");
          setUserData(null);
          setIsOpen(false);
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [isOpen, setIsOpen]);

  /* ===============================
     LOGOUT (ONLY BUTTON)
  =============================== */
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    setIsOpen(false);
    navigate("/", { replace: true });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* OVERLAY */}
      <div
        className="fixed inset-0 bg-black/30 z-[998]"
        onClick={() => setIsOpen(false)}
      />

      {/* PROFILE CARD */}
      <div
        ref={profileRef}
        className="
          fixed top-20 right-4 z-[999]
          w-64 p-4 rounded-3xl shadow-xl
          bg-white dark:bg-[#1F2937] dark:text-white
        "
      >
        <div className="flex gap-3 mb-3">
          <img
            src={images.profile}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />

          <div>
            <h3 className="font-semibold">{userData?.first_name ?? "User"}</h3>
            <h3 className="font-semibold">{userData?.last_name ?? ""}</h3>
            <p className="text-sm text-gray-400">
              {userData?.phone_number ?? "+998---------"}
            </p>
          </div>
        </div>

        <hr className="my-3" />

        <SelectInput />

        <hr className="my-3" />

        <Link
          to="/support"
          className="block text-sm text-blue-500 hover:underline mb-2"
        >
          Qo‘llab-quvvatlash
        </Link>

        <button
          onClick={handleLogout}
          className="
            w-full py-2 rounded-xl
            bg-red-500 hover:bg-red-600
            text-white text-sm font-medium
            transition
          "
        >
          Chiqish
        </button>
      </div>
    </>
  );
};

export default Profile;
