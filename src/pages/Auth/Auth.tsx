import { Route, Routes } from "react-router-dom";
import Image from "../../components/Image/Image";
import Register from "../../components/Register/Register";

import "./Auth.css";
import Login from "../../components/Login/Login";
import Reset from "../../components/Reset/Reset";
import Confirm from "../../components/Confirm/Confirm";
import ConfirmCode from "../../components/ConfirmCode/ConfirmCode";

function Auth() {
  return (
    <div className="auth">
      <div className="auth__left">
        <div className="auth__content">
          <Image name="logoWhite" className="w-34.5 h-13.5" />

          <h2 className="mt-66.5 text-[32px] font-extrabold text-white">
            Auto test platformasi
          </h2>
          <p className="text-[14px] font-normal text-white">
            Bu platforma onlayn testlar yaratish, boshqarish va tahlil qilish
            uchun mo‘ljallangan. Foydalanuvchilar testlarni tezkor tarzda
            tuzishi, natijalarni ko‘rishi va ulashishi mumkin.
          </p>
        </div>
      </div>
      <div className="auth__right">
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="reset" element={<Reset />} />
          <Route path="confirm" element={<Confirm />} />
          <Route path="confirm-code" element={<ConfirmCode />} />
        </Routes>
      </div>
    </div>
  );
}
export default Auth;
