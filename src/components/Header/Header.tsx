import { useState, useRef } from "react";
import { FaRegUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Image from "../Image/Image";
import Profile from "../Profile/Profile";
import { Toggle } from "../Toggle/Toggle";

type HeaderProps = {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  timeLeft?: number;
  increaseFont?: () => void;
  decreaseFont?: () => void;
  onFinish?: () => void;
};

const Header = ({
  isDark,
  setIsDark,
  timeLeft,
  increaseFont,
  decreaseFont,
  onFinish,
}: HeaderProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 🔴 FAQAT SHU QO‘SHILDI
  const profileIconRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <header className="relative border rounded-[20px] p-4 border-[#cbc7c480] flex items-center justify-between bg-white dark:bg-[#0B142D]">
        {/* LEFT */}
        <div className=" flex items-center  md:flex-row gap-3">
          <button
            onClick={() => setIsMobileMenuOpen((p) => !p)}
            className="md:hidden text-xl dark:text-white"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <Link to="/home" className="w-28">
            <Image name={isDark ? "logoWhite" : "darkLogo"} />
          </Link>
        </div>

        {/* CENTER */}
        <div className="flex items-center gap-3">
          {timeLeft !== undefined && (
            <div className="font-semibold dark:text-white">
              ⏱ {Math.floor(timeLeft / 60)}:
              {String(timeLeft % 60).padStart(2, "0")}
            </div>
          )}

          {onFinish && (
            <button
              onClick={onFinish}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-semibold"
            >
              Yakunlash
            </button>
          )}
        </div>

        {/* RIGHT (DESKTOP) */}
        <div className="hidden md:flex items-center gap-3">
          {increaseFont && decreaseFont && (
            <div className="flex gap-2 dark:text-white">
              <button
                onClick={decreaseFont}
                className="px-2 py-1 border rounded"
              >
                A-
              </button>
              <button
                onClick={increaseFont}
                className="px-2 py-1 border rounded"
              >
                A+
              </button>
            </div>
          )}

          <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />

          {/* 🔴 FAQAT ICON QISMI O‘ZGARDI */}
          <div ref={profileIconRef}>
            <FaRegUserCircle
              size={26}
              className="cursor-pointer dark:text-white"
              onClick={() => setIsProfileOpen((prev) => !prev)}
            />
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              className="fixed top-20 left-4 right-4 z-50 md:hidden bg-white dark:bg-[#0B142D] border rounded-2xl p-4 flex flex-col gap-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
            >
              {increaseFont && decreaseFont && (
                <div className="flex justify-between items-center dark:text-white">
                  <span>Font size</span>
                  <div className="flex gap-2">
                    <button
                      onClick={decreaseFont}
                      className="px-3 py-1 border rounded"
                    >
                      A-
                    </button>
                    <button
                      onClick={increaseFont}
                      className="px-3 py-1 border rounded"
                    >
                      A+
                    </button>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center dark:text-white">
                <span>Dark mode</span>
                <Toggle
                  isChecked={isDark}
                  handleChange={() => setIsDark(!isDark)}
                />
              </div>

              {/* 🔴 FAQAT SHU JOY */}
              <button
                onClick={() => {
                  setIsProfileOpen((prev) => !prev);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 dark:text-white"
              >
                <FaRegUserCircle size={22} />
                <span>Profile</span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* PROFILE */}
      <Profile
        isOpen={isProfileOpen}
        setIsOpen={setIsProfileOpen}
        triggerRef={profileIconRef}
      />
    </>
  );
};

export default Header;
