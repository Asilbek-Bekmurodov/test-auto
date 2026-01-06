import type { Question } from "../../Utilities/Services/types";
import AnswerItem from "../AnswerItem/AnswerItem";
import type { AnswerResult, QuestionStatus } from "../Test/Test";

interface AnswerListProps {
  question: Question | null;
  sessionId: string;
  setTimeLeft: (seconds: number) => void;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setFinished: (finished: boolean) => void;
  currentIndex: number;
  setQuestionStatus: React.Dispatch<React.SetStateAction<QuestionStatus[]>>;
  answersMap: Record<number, AnswerResult>;
  setAnswersMap: React.Dispatch<
    React.SetStateAction<Record<number, AnswerResult>>
  >;
  finished: boolean;
  onAnswered: () => void;
}

const AnswerList = ({
  question,
  sessionId,
  setTimeLeft,
  setFinished,
  currentIndex,
  setQuestionStatus,
  answersMap,
  setAnswersMap,
  finished,
  onAnswered,
}: AnswerListProps) => {
  if (!question || !question.options) return null;

  const optionsArray = Object.entries(question.options);
  const savedAnswer = answersMap[currentIndex];

  const handleClick = async (key: string) => {
    if (savedAnswer || finished) return;

    try {
      const token = localStorage.getItem("token");

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      // token bo‘lsa qo‘shamiz, bo‘lmasa yo‘q
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await fetch(
        `https://imtihongatayyorlov.pythonanywhere.com/tests/during/${sessionId}/answer/`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            question_id: question.id,
            selected_option: key,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Answer submit failed");
      }

      const data = await res.json();

      if (
        typeof data.remaining_seconds === "number" &&
        data.remaining_seconds > 0
      ) {
        setTimeLeft(data.remaining_seconds);
      }

      // Question status update
      setQuestionStatus((prev) => {
        const updated = [...prev];
        updated[currentIndex] = data.is_correct ? "correct" : "wrong";
        return updated;
      });

      // Save answer
      setAnswersMap((prev) => ({
        ...prev,
        [currentIndex]: {
          selectedKey: key,
          isCorrect: data.is_correct,
        },
      }));

      if (data.finished) {
        setFinished(true);
      }

      // Next question
      setTimeout(() => onAnswered(), 700);
    } catch (err) {
      console.error("Javob yuborishda xatolik:", err);
    }
  };

  return (
    <div className="w-full col-span-2 flex flex-col gap-4 ">
      {optionsArray.map(([key, text]) => {
        const isSelected = savedAnswer?.selectedKey === key;
        const correctness = isSelected ? savedAnswer.isCorrect : undefined;

        return (
          <AnswerItem
            key={key}
            text={`${key}: ${text}`}
            active={isSelected}
            correct={correctness}
            onClick={() => handleClick(key)}
          />
        );
      })}
    </div>
  );
};

export default AnswerList;
