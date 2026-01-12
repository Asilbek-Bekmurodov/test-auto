type Props = {
  text: string;
  active?: boolean; // foydalanuvchi tanladi
  correct?: boolean | null; // javob to'g'ri yoki noto'g'ri
  onClick?: () => void;
};

const AnswerItem = ({ text, active, correct, onClick }: Props) => {
  let bgClass = "bg-white dark:bg-[#050c1d84] dark:text-white"; // default
  let hoverClass = "hover:bg-blue-300"; // default hover

  if (active) {
    if (correct === true) bgClass = "bg-green-500 text-white";
    else if (correct === false) bgClass = "bg-red-500 text-white";
    else bgClass = "bg-gray-200 ";

    hoverClass = ""; // tanlangan javobda hover yo‘q
  }

  return (
    <button
      onClick={onClick}
      className={`cursor-pointer w-full py-4 px-6 rounded-lg border text-left transition ${bgClass} ${hoverClass} border-gray-300 `}
    >
      {text}
    </button>
  );
};

export default AnswerItem;
