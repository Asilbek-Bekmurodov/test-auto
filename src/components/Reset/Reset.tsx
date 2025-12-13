import Button from "../Button/Button";

function Reset() {
  return (
    <div>
      <h2 className="text-center text-[30px] leading-[130px] tracking-[-1%] font-semibold">
        Parolni tiklash
      </h2>
      <form
        action="#"
        className="flex flex-col gap-6 justify-center items-center"
      >
        <input
          type="text"
          placeholder="Telefon raqam"
          className="w-full border-none outline-none pb-4 border-b-2 border-[#4A43EC33] text-[16px] form__input"
        />

        <Button className="btn">Tiklash</Button>
      </form>
    </div>
  );
}
export default Reset;
