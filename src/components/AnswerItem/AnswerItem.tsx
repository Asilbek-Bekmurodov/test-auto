type Props = {
  text: string;
  active?: boolean; // foydalanuvchi tanladi
  correct?: boolean | null; // javob to'g'ri yoki noto'g'ri
  onClick?: () => void;
};

const AnswerItem = ({ text, active, correct, onClick }: Props) => {
  let bgClass = "bg-white"; // default

  if (active) {
    if (correct === true) bgClass = "bg-green-500 text-white";
    else if (correct === false) bgClass = "bg-red-500 text-white";
    else bgClass = "bg-gray-200";
  }

  return (
    <button
      onClick={onClick}
      className={`w-full py-4 px-6 rounded-lg border text-left transition ${bgClass} border-gray-300 hover:bg-gray-100`}
    >
      {text}
    </button>
  );
};

export default AnswerItem;
