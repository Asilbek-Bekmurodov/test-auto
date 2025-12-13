import { useState } from "react";
import Button from "../Button/Button";
import OTPInput from "../OTPInput/OTPInput";
import { toast } from "react-toastify";

function ConfirmCode() {
  const [otp, setOtp] = useState<string>("");

  const handleSendCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        },
        body: JSON.stringify(obj),
      }
    );

    const data = await res.json();
    if (!res.ok) {
      toast.error(data?.detail || "Something went wrong");
    } else {
      console.log(data);
      toast.success(
        data?.message || "Tabriklaymiz muvaffaqqiyatli ro'yhatdan o'tdingiz"
      );
    }
  };

  return (
    <div>
      <h2 className="text-base">Parolni tiklash</h2>
      <form onSubmit={handleSendCode} action="#" className="form">
        <OTPInput length={6} onChange={setOtp} />
        <p>Entered OTP: {otp}</p>
        <Button className="btn">Tasdiqlash</Button>
      </form>
    </div>
  );
}
export default ConfirmCode;
