import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./Register.css";
import { useState } from "react";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [userData, getUserData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    password: "",
  });

  function getData(e: React.ChangeEvent<HTMLInputElement>) {
    getUserData({ ...userData, [e.target.name]: e.target.value });
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();

    console.log(userData);

    try {
      const res = await fetch(
        "https://imtihongatayyorlov.pythonanywhere.com/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.detail || "Register failed");
      } else {
        console.log(data);
        localStorage.setItem("token", data);
        localStorage.setItem("pre_token", data.pre_token);
        toast.success(data?.detail || "Sizga sms kod yuborildi !");
        navigate("/auth/confirm-code");
      }
    } catch (err) {
      console.log(err);
      toast.error(
        err instanceof Error ? err.message : "Something went wrong ❌"
      );
    }
  };
  return (
    <div>
      <h2 className="text-center font-semibold text-[30px] leading-[130px] tracking-[-1%]">
        Ro'yxatdan o'tish
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-6"
      >
        <input
          className="w-full border-none outline-none pb-4 border-b-2 border-[#4A43EC33] text-[16px] form__input"
          required
          onChange={getData}
          name="first_name"
          type="text"
          placeholder="Ism"
        />
        <input
          className="w-full border-none outline-none pb-4 border-b-2 border-[#4A43EC33] text-[16px] form__input"
          required
          onChange={getData}
          name="last_name"
          type="text"
          placeholder="Familiya"
        />
        <input
          className="w-full border-none outline-none pb-4 border-b-2 border-[#4A43EC33] text-[16px] form__input"
          required
          onChange={getData}
          name="phone_number"
          type="text"
          placeholder="Telefon raqam"
        />
        <input
          className="w-full border-none outline-none pb-4 border-b-2 border-[#4A43EC33] text-[16px] form__input"
          required
          onChange={getData}
          name="password"
          type="text"
          placeholder="Parol"
        />
        <div className="w-full flex justify-between items-center px-5 text-[14px]">
          <label htmlFor="checkbox" className="flex items-center gap-1">
            {" "}
            <input type="checkbox" name="" id="checkbox" /> Eslab qolish
          </label>
          <a href="" className="text-blue-600">
            Parolni tiklash
          </a>
        </div>
        <Button className="btn">Ro'yxatdan o'tish</Button>

        <span className="text-[#99A0A8] text-[14px]">yoki</span>

        <p className="text-[#99A0A8] text-[14px]">
          Accountingiz mavjudmi ?{" "}
          <Link className="text-blue-600" to={"/auth/login"}>
            Tizimga kirish
          </Link>{" "}
        </p>
      </form>
    </div>
  );
}
export default Register;
