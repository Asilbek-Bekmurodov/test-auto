import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./Login.css";

function Login() {
  return (
    <div>
      <h2 className="register__title">Tizimga kirish</h2>
      <form action="#" className="form">
        <input
          type="text"
          placeholder="Telefon raqam"
          className="form__input"
        />
        <input type="text" placeholder="Parol" className="form__input" />
        <div className="form__remember w-full">
          <label htmlFor="checkbox">
            {" "}
            <input type="checkbox" name="" id="checkbox" /> Eslab qolish
          </label>
          <Link to={'/auth/reset'} className="password-repair">
            Parolni tiklash
          </Link>
        </div>
        <Button className="btn">Ro'yxatdan o'tish</Button>

        <span className="or">yoki</span>

        <p className="isAviable">
         Hisobingiz yo‘qmi? 
          <Link className="link" to={'/auth/register'}>
            Ro‘yxatdan o‘tish
          </Link>{" "}
        </p>
      </form>
    </div>
  );
}
export default Login;
