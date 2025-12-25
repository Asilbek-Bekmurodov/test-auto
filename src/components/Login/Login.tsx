import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./Login.css";
import { toast } from "react-toastify";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [userData, getUserData] = useState({
    phone_number: "+998914530909",
    password: "123",
  });

  function getData(e: React.ChangeEvent<HTMLInputElement>) {
    getUserData({ ...userData, [e.target.name]: e.target.value });
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();

    console.log(userData);

    try {
      const res = await fetch(
        "https://imtihongatayyorlov.pythonanywhere.com/login/",
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
        toast.error(data?.detail || "Login failed");
      } else {
        console.log(data);
        localStorage.setItem("token", data.access);
        toast.success(data?.detail || "Muvaffaqqiyatli ro'yhatdan o'tildi");
        navigate("/home");
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
        Tizimga kirish
      </h2>
      <form
        onSubmit={handleSubmit}
        action="#"
        className="flex flex-col items-center gap-6"
      >
        <input
          type="text"
          defaultValue={"+998914530909"}
          required
          onChange={getData}
          name="phone_number"
          placeholder="Telefon raqam"
          className="w-full border-none outline-none pb-4 border-b-2 border-[#4A43EC33] text-[16px] form__input"
        />
        <input
          type="text"
          required
          defaultValue={"123"}
          onChange={getData}
          name="password"
          placeholder="Parol"
          className="w-full border-none outline-none pb-4 border-b-2 border-[#4A43EC33] text-[16px] form__input"
        />
        <div className="flex justify-between w-full ">
          <label htmlFor="checkbox">
            {" "}
            <input type="checkbox" name="" id="checkbox" /> Eslab qolish
          </label>
          <Link to={"/auth/reset"} className="password-repair">
            Parolni tiklash
          </Link>
        </div>
        <Button className="btn">Ro'yxatdan o'tish</Button>

        <span className="text-[#99A0A8] text-[14px]">yoki</span>

        <p className="text-[#99A0A8] text-[14px]">
          Hisobingiz yo‘qmi?
          <Link className="text-blue-600 ml-2" to={"/auth/register"}>
            Ro‘yxatdan o‘tish
          </Link>{" "}
        </p>
      </form>
    </div>
  );
}
export default Login;
