import type { Dispatch, SetStateAction } from "react";

interface QuestionNavigationProps {
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  total: number;
}

const QuestionNavigation = ({
  currentIndex,
  setCurrentIndex,
  total,
}: QuestionNavigationProps) => {
  const questions = Array.from({ length: total }, (_, i) => i);

  return (
    <div className="mt-6 flex flex-wrap gap-2 justify-center">
      {questions.map((index) => (
        <button
          key={index}
          onClick={() => setCurrentIndex(index)}
          className={`w-8 h-8 text-sm rounded transition
            ${
              index === currentIndex
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-blue-500 hover:text-white"
            }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default QuestionNavigation;
