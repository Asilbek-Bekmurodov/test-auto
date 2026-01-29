type Props = {
  text: string;
  active?: boolean; // foydalanuvchi tanladi
  correct?: boolean | null; // true = to‘g‘ri, false = noto‘g‘ri
  onClick?: () => void;
};

const AnswerItem = ({ text, active, correct, onClick }: Props) => {
  let bgClass = "bg-white dark:bg-[#050c1d84] dark:text-white";
  let hoverClass = "hover:bg-blue-300";

  /**
   * HOLATLAR:
   * 1. correct === true  → har doim yashil (tanlangan bo‘lsa ham, bo‘lmasa ham)
   * 2. active && correct === false → qizil
   * 3. active && correct == null → kulrang
   */

  if (correct === true) {
    bgClass = "bg-green-500 text-white";
    hoverClass = "";
  } else if (active && correct === false) {
    bgClass = "bg-red-500 text-white";
    hoverClass = "";
  } else if (active) {
    bgClass = "bg-gray-200 dark:bg-gray-600";
    hoverClass = "";
  }

  return (
    <button
      onClick={onClick}
      className={`cursor-pointer w-full py-4 px-6 rounded-lg border text-left transition ${bgClass} ${hoverClass} border-gray-300`}
    >
      {text}
    </button>
  );
};

export default AnswerItem;
