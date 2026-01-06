import type { Dispatch, SetStateAction } from "react";

type QuestionStatus = "unanswered" | "correct" | "wrong";

interface QuestionNavigationProps {
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  total: number;
  questionStatus: QuestionStatus[];
}

const QuestionNavigation = ({
  currentIndex,
  setCurrentIndex,
  total,
  questionStatus,
}: QuestionNavigationProps) => {
  console.log("NAV STATUS:", questionStatus);
  return (
    <div className="mt-6 flex flex-wrap gap-2 justify-center">
      {Array.from({ length: total }).map((_, index) => {
        const status: QuestionStatus = questionStatus?.[index] ?? "unanswered";

        let color =
          "bg-gray-200 text-gray-700 dark:bg-[#0B142D] dark:text-white";

        // 1️⃣ Avval status ranglari
        if (status === "correct") color = "bg-green-500 text-white";
        else if (status === "wrong") color = "bg-red-500 text-white";

        // 2️⃣ ACTIVE har doim ustun bo‘lsin
        if (index === currentIndex) {
          color = "bg-blue-600 text-white";
        }

        return (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-8 h-8 text-sm rounded transition   dark:border dark:border-gray-300 ${color}`}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
};

export default QuestionNavigation;
