import { motion, AnimatePresence } from "framer-motion";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type Props = {
  errors: Partial<{
    password: string;
  }>;
  getData: (e: ChangeEvent<HTMLInputElement>) => void;
  inputClass: string;
};

const PasswordInput = ({ errors, getData, inputClass }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <input
        className={`${inputClass} pr-10`} // icon uchun padding
        onChange={getData}
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="Parol"
      />
      {/* Ko‘z ikonasi */}
      <span
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <AiOutlineEyeInvisible size={20} />
        ) : (
          <AiOutlineEye size={20} />
        )}
      </span>

      <AnimatePresence>
        {errors.password && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-red-500 text-sm mt-1"
          >
            {errors.password}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PasswordInput;
