import { Link } from "react-router-dom"
import Button from "../Button/Button"
import "./Register.css"

function Register() {
  return (
    <div>
      <h2 className="register__title">Ro'yxatdan o'tish</h2>
      <form action="#" className="form">
        <input type="text" placeholder="Ism" className="form__input" />
        <input type="text" placeholder="Familiya" className="form__input" />
        <input type="text" placeholder="Telefon raqam" className="form__input" />
        <input type="text" placeholder="Parol" className="form__input" />
        <div className="form__remember w-full">
    
        <label htmlFor="checkbox"> <input type="checkbox" name="" id="checkbox" /> Eslab qolish</label>
        <a href="" className="password-repair">Parolni tiklash</a>
       </div>
        <Button className="btn">
          Ro'yxatdan o'tish
        </Button>
       

        <span className="or">yoki</span>

       <p className="isAviable">Accountingiz mavjudmi ? <Link className="link" to={'/auth/login'}>Tizimga kirish</Link> </p>
      </form>

    </div>
  )
}
export default Register