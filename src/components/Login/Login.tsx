import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./Login.css";
import { toast } from "react-toastify";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PasswordInput from "../PasswordInput/PasswordInput";

interface LoginData {
  phone_number: string; // faqat +998 dan keyingi qism
  password: string;
}

function Login() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState<LoginData>({
    phone_number: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<LoginData>>({});
  const [loading, setLoading] = useState(false);

  function getData(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    if (name === "phone_number") {
      // faqat raqamlar, maksimal 9 ta
      const digits = value.replace(/\D/g, "").slice(0, 9);
      setUserData({ ...userData, phone_number: digits });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  }

  const validate = (): boolean => {
    const newErrors: Partial<LoginData> = {};

    if (!/^\d{9}$/.test(userData.phone_number))
      newErrors.phone_number = "Telefon raqam noto‘g‘ri";
    if (!userData.password.trim())
      newErrors.password = "Parol kiritilishi shart";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch(
        "https://imtihongatayyorlov.pythonanywhere.com/auth/login/",
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
        toast.error(data?.detail || "Login failed");
      } else {
        localStorage.setItem("token", data.access);
        toast.success(data?.detail || "Muvaffaqqiyatli tizimga kirildi");
        navigate("/home");
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Something went wrong ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border-none outline-none pb-4 border-b-2 border-[#4A43EC33] text-[16px] form__input";

  return (
    <div>
      <h2 className="text-center font-semibold text-[30px] leading-[130px] tracking-[-1%]">
        Tizimga kirish
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-6"
      >
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
        <PasswordInput
          errors={errors}
          getData={getData}
          inputClass={inputClass}
        />

        <div className="flex justify-between w-full">
          <label htmlFor="checkbox">
            <input type="checkbox" name="" id="checkbox" /> Eslab qolish
          </label>
          <Link to={"/auth/reset"} className="password-repair">
            Parolni tiklash
          </Link>
        </div>

        <Button type="submit" className="btn" disabled={loading}>
          {loading ? "Waiting..." : "Kirish"}
        </Button>

        <span className="text-[#99A0A8] text-[14px]">yoki</span>

        <p className="text-[#99A0A8] text-[14px]">
          Hisobingiz yo‘qmi?
          <Link className="text-blue-600 ml-2" to={"/auth/register"}>
            Ro‘yxatdan o‘tish
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
