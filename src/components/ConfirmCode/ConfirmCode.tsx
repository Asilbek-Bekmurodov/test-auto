import { useEffect, useState } from "react";
import Button from "../Button/Button";
import OTPInput from "../OTPInput/OTPInput";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ConfirmCode() {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const preToken = localStorage.getItem("pre_token");

  // ⏱ Timer
  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // ✅ Verify OTP
  const handleSendCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (otp.length < 6) {
      toast.warning("Kod to‘liq kiriting!");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "https://imtihongatayyorlov.pythonanywhere.com/verify-phone-number/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${preToken}`,
          },
          body: JSON.stringify({ verification_code: otp }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.detail || "Kod noto‘g‘ri");
        return;
      }

      toast.success("Muvaffaqqiyatli tasdiqlandi 🎉");
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.removeItem("pre_token");
      navigate("/home/");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Server xatosi");
      }
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Resend OTP
  const handleResend = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "https://imtihongatayyorlov.pythonanywhere.com/resend-phone-number/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${preToken}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.detail || "Qayta yuborib bo‘lmadi");
        return;
      }
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      toast.success("Kod qayta yuborildi 📩");
      setTimeLeft(60); // timer reset
    } catch {
      toast.error("Server xatosi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-base mb-2">Tasdiqlash</h2>

      <form onSubmit={handleSendCode} className="form">
        <OTPInput length={6} onChange={setOtp} />

        <Button className="btn" disabled={loading}>
          Tasdiqlash
        </Button>
      </form>

      {/* TIMER */}
      {timeLeft > 0 ? (
        <p className="mt-3 text-sm text-gray-500">
          Qayta yuborish: {timeLeft} soniya
        </p>
      ) : (
        <button
          onClick={handleResend}
          disabled={loading}
          className="mt-3 text-blue-600 underline"
        >
          Qayta SMS yuborish
        </button>
      )}
    </div>
  );
}

export default ConfirmCode;
