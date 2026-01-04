import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./Register.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import PasswordInput from "../PasswordInput/PasswordInput";

/* =====================
   TYPES
===================== */

interface UserData {
  first_name: string;
  last_name: string;
  phone_number: string; // +998 dan keyingi qismi
  password: string;
}

/* =====================
   COMPONENT
===================== */

function Register() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState<UserData>({
    first_name: "",
    last_name: "",
    phone_number: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<UserData>>({});
  const [loading, setLoading] = useState(false);

  /* =====================
     HANDLERS
  ===================== */

  function getData(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    if (name === "phone_number") {
      const digits = value.replace(/\D/g, "").slice(0, 9);
      setUserData({ ...userData, phone_number: digits });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  }

  const validate = (): boolean => {
    const newErrors: Partial<UserData> = {};

    if (!userData.first_name.trim())
      newErrors.first_name = "Ism kiritilishi shart";

    if (!userData.last_name.trim())
      newErrors.last_name = "Familiya kiritilishi shart";

    if (!/^\d{9}$/.test(userData.phone_number))
      newErrors.phone_number = "Telefon raqam noto‘g‘ri";

    if (userData.password.length < 6)
      newErrors.password = "Parol kamida 6 ta belgidan iborat bo‘lishi kerak";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch(
        "https://imtihongatayyorlov.pythonanywhere.com/auth/register/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...userData,
            phone_number: "+998" + userData.phone_number,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.detail || "Register failed");
      } else {
        localStorage.setItem("pre_token", data.pre_token);
        toast.success("Sizga SMS kod yuborildi 📩");
        navigate("/auth/confirm-code");
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Something went wrong ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================
     STYLES
  ===================== */

  const inputClass =
    "w-full border-none outline-none pb-3 sm:pb-4 border-b-2 border-[#4A43EC33] text-base sm:text-[16px] form__input";

  /* =====================
     JSX
  ===================== */

  return (
    <div className=" flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md sm:max-w-lg bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-center font-semibold text-2xl sm:text-3xl mb-8">
          Ro'yxatdan o'tish
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
          {/* First Name */}
          <div>
            <input
              className={inputClass}
              onChange={getData}
              name="first_name"
              type="text"
              placeholder="Ism"
            />
            <AnimatePresence>
              {errors.first_name && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.first_name}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Last Name */}
          <div>
            <input
              className={inputClass}
              onChange={getData}
              name="last_name"
              type="text"
              placeholder="Familiya"
            />
            <AnimatePresence>
              {errors.last_name && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.last_name}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Phone */}
          <div className="relative">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 pl-2 text-gray-600 font-medium">
              +998
            </span>
            <input
              className={`${inputClass} pl-14`}
              onChange={getData}
              name="phone_number"
              type="text"
              placeholder="-- --- -- --"
              value={userData.phone_number}
            />
            <AnimatePresence>
              {errors.phone_number && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.phone_number}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Password */}
          <PasswordInput
            errors={errors}
            getData={getData}
            inputClass={inputClass}
          />

          {/* Remember + Forgot */}
          <div className="flex flex-col sm:flex-row gap-2 sm:justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Eslab qolish
            </label>
            <a href="#" className="text-blue-600">
              Parolni tiklash
            </a>
          </div>

          {/* Submit */}
          <Button className="btn w-full mt-4" type="submit" disabled={loading}>
            {loading ? "Waiting..." : "Ro'yxatdan o'tish"}
          </Button>

          <span className="text-center text-[#99A0A8] text-sm">yoki</span>

          <p className="text-center text-[#99A0A8] text-sm">
            Accountingiz mavjudmi?{" "}
            <Link className="text-blue-600" to="/auth/login">
              Tizimga kirish
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
