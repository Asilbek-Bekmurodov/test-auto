import type { Question } from "../../Utilities/Services/types";
import AnswerItem from "../AnswerItem/AnswerItem";
import type { QuestionStatus, AnswerResult } from "./TestTypes";

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
  setCurrentIndex,
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
      if (!token) throw new Error("User is not authenticated");

      const res = await fetch(
        `https://imtihongatayyorlov.pythonanywhere.com/tests/during/${sessionId}/answer/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            question_id: question.id,
            selected_option: key,
          }),
        }
      ).then((r) => r.json());

      setTimeLeft(res.remaining_seconds);

      // Question status update
      setQuestionStatus((prev) => {
        const updated = [...prev];
        updated[currentIndex] = res.is_correct ? "correct" : "wrong";
        return updated;
      });

      // Save answer
      setAnswersMap((prev) => ({
        ...prev,
        [currentIndex]: { selectedKey: key, isCorrect: res.is_correct },
      }));

      // Oxirgi savolni backend tugatgan bo‘lsa, frontend ham tugatsin
      if (res.finished && currentIndex === Object.keys(answersMap).length) {
        setFinished(true);
      }

      // Next question
      setTimeout(() => onAnswered(), 700);
    } catch (err) {
      console.error("Javob yuborishda xatolik:", err);
    }
  };

  return (
    <div className="w-[50%] col-span-2 flex flex-col gap-4">
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
