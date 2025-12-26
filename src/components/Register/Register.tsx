import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./Register.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

interface UserData {
  first_name: string;
  last_name: string;
  phone_number: string; // faqat +998 dan keyingi qism
  password: string;
}

function Register() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState<UserData>({
    first_name: "",
    last_name: "",
    phone_number: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<UserData>>({});
  const [loading, setLoading] = useState(false); // ✅ submit paytida button holati

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

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();

    if (!validate()) return;

    setLoading(true); // ✅ submit bosilganda

    try {
      const res = await fetch(
        "https://imtihongatayyorlov.pythonanywhere.com/register/",
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
        localStorage.setItem("token", data.access);
        localStorage.setItem("pre_token", data.pre_token);
        toast.success(data?.detail || "Sizga sms kod yuborildi !");
        navigate("/auth/confirm-code");
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Something went wrong ❌"
      );
    } finally {
      setLoading(false); // ✅ submit tugagach button holati tiklanadi
    }
  };

  const inputClass =
    "w-full border-none outline-none pb-4 border-b-2 border-[#4A43EC33] text-[16px] form__input";

  return (
    <div>
      <h2 className="text-center font-semibold text-[30px] leading-[130px] tracking-[-1%]">
        Ro'yxatdan o'tish
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-6"
      >
        {/* First Name */}
        <div className="w-full">
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
        <div className="w-full">
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

        {/* Phone Number */}
        <div className="w-full relative">
          <span className="absolute left-[-1px] top-[30%] -translate-y-1/2 pl-2 text-gray-600 font-medium">
            +998
          </span>
          <input
            className={`${inputClass} pl-[50px] text-gray-600 font-medium`}
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
        <div className="w-full">
          <input
            className={inputClass}
            onChange={getData}
            name="password"
            type="password"
            placeholder="Parol"
          />
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

        <div className="w-full flex justify-between items-center px-5 text-[14px]">
          <label htmlFor="checkbox" className="flex items-center gap-1">
            <input type="checkbox" name="" id="checkbox" /> Eslab qolish
          </label>
          <a href="" className="text-blue-600">
            Parolni tiklash
          </a>
        </div>

        <Button className="btn" type="submit" disabled={loading}>
          {loading ? "Waiting..." : "Ro'yxatdan o'tish"}
        </Button>

        <span className="text-[#99A0A8] text-[14px]">yoki</span>

        <p className="text-[#99A0A8] text-[14px]">
          Accountingiz mavjudmi ?{" "}
          <Link className="text-blue-600" to={"/auth/login"}>
            Tizimga kirish
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
