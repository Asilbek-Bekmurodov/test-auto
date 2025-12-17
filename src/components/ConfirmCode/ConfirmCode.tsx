import { useState } from "react";
import Button from "../Button/Button";
import OTPInput from "../OTPInput/OTPInput";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ConfirmCode() {
  const [otp, setOtp] = useState<string>("");
  const navigate = useNavigate();

  const handleSendCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const preToken = localStorage.getItem("pre_token");

    if (otp.length < 6) {
      toast.warning("Kod to'liq kiriting !");
    }

    const obj: { verification_code: string } = {
      verification_code: otp,
    };

    const res = await fetch(
      "https://imtihongatayyorlov.pythonanywhere.com/verify-phone-number/",
      {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${preToken}`,
        },
        body: JSON.stringify(obj),
      }
    );

    console.log(res);

    const data = await res.json();
    if (!res.ok) {
      toast.error(data?.detail || "Something went wrong");
    } else {
      console.log(data);

      toast.success(
        data?.message || "Tabriklaymiz muvaffaqqiyatli ro'yhatdan o'tdingiz"
      );
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.removeItem("pre_token");
      navigate("/home/");
    }
  };

  return (
    <div>
      <h2 className="text-base">Tasdiqlash</h2>
      <form onSubmit={handleSendCode} action="#" className="form">
        <OTPInput length={6} onChange={setOtp} />
        <p>Entered OTP: {otp}</p>
        <Button className="btn">Tasdiqlash</Button>
      </form>
    </div>
  );
}
export default ConfirmCode;
