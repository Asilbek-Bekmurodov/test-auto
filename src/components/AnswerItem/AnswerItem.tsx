type Props = {
  text: string;
  active?: boolean;
};
const AnswerItem = ({ text, active }: Props) => {
  return (
    <button
      className={`w-full py-4 px-6 rounded-lg border text-left transition
        ${
          active
            ? "border-blue-500 ring-2 ring-blue-400"
            : "border-gray-300 hover:bg-gray-100"
        }`}
    >
      {text}
    </button>
  );
};
export default AnswerItem;
