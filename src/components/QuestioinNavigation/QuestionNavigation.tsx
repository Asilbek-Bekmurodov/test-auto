import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import type { Dispatch, SetStateAction } from "react";

type QuestionStatus = "unanswered" | "correct" | "wrong";

interface QuestionNavigationProps {
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  total: number;
  questionStatus: QuestionStatus[];
}

const QUESTIONS_PER_PAGE = 10;

const QuestionNavigation = ({
  currentIndex,
  setCurrentIndex,
  total,
  questionStatus,
}: QuestionNavigationProps) => {
  const currentPage = Math.floor(currentIndex / QUESTIONS_PER_PAGE);
  const totalPages = Math.ceil(total / QUESTIONS_PER_PAGE);

  const start = currentPage * QUESTIONS_PER_PAGE;
  const end = Math.min(start + QUESTIONS_PER_PAGE, total);

  const goPrev = () => {
    if (currentPage > 0) {
      setCurrentIndex((currentPage - 1) * QUESTIONS_PER_PAGE);
    }
  };

  const goNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentIndex((currentPage + 1) * QUESTIONS_PER_PAGE);
    }
  };

  return (
    <div className="mt-6 flex flex-wrap gap-2 justify-center items-center">
      {/* ⏮️ PREV */}
      <button
        onClick={goPrev}
        disabled={currentPage === 0}
        className="px-3 h-8 rounded bg-gray-300 text-sm disabled:opacity-50 dark:bg-[#0B142D] dark:text-white"
      >
        <IoIosArrowBack />
      </button>

      {/* 🔢 QUESTIONS */}
      {Array.from({ length: end - start }).map((_, i) => {
        const index = start + i;
        const status: QuestionStatus = questionStatus?.[index] ?? "unanswered";

        let color =
          "bg-gray-200 text-gray-700 dark:bg-[#0B142D] dark:text-white";

        if (status === "correct") color = "bg-green-500 text-white";
        else if (status === "wrong") color = "bg-red-500 text-white";

        if (index === currentIndex) {
          color = "bg-blue-600 text-white";
        }

        return (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-8 h-8 text-sm rounded transition dark:border dark:border-gray-300 ${color}`}
          >
            {index + 1}
          </button>
        );
      })}

      {/* 📄 PAGE INDICATOR */}
      <span className="mx-2 text-sm font-medium text-gray-700 dark:text-gray-200">
        {currentPage + 1} / {totalPages}
      </span>

      {/* ⏭️ NEXT */}
      <button
        onClick={goNext}
        disabled={currentPage === totalPages - 1}
        className="px-3 h-8 rounded bg-gray-300 text-sm disabled:opacity-50 dark:bg-[#0B142D] dark:text-white"
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default QuestionNavigation;
