import { useState } from "react";
import Button from "../Button/Button";
import OTPInput from "../OTPInput/OTPInput";

function Confirm() {
  const [otp, setOtp] = useState<string>("");
  return (
    <div>
      <h2 className="text-base">Parolni tiklash</h2>
      <form action="#" className="flex flex-col ">
        <OTPInput length={6} onChange={setOtp} />
        <p>Entered OTP: {otp}</p>
        <Button className="btn">Tasdiqlash</Button>
      </form>
    </div>
  );
}
export default Confirm;
