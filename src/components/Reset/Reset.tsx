import Button from "../Button/Button"

function Reset() {
  return (
   <div>
      <h2 className="register__title">Parolni tiklash</h2>
      <form action="#" className="form">
        <input
          type="text"
          placeholder="Telefon raqam"
          className="form__input"
        />
        
        <Button className="btn">Parolni tiklash</Button>

      </form>
    </div>
  )
}
export default Reset