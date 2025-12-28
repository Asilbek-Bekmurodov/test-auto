import type { Question } from "../../Utilities/Services/types";
import AnswerItem from "../AnswerItem/AnswerItem";

export type QuestionStatus = "unanswered" | "correct" | "wrong";

export type AnswerResult = {
  selectedKey: string;
  isCorrect: boolean;
};


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

const token = localStorage.getItem("token");

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
    if (savedAnswer) return; // Javob allaqachon berilgan
    if (finished) return; // 👈 TEST TUGAGAN
    try {
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

      // Javob feedback
      // setFeedback(res.is_correct ? "To'g'ri!" : "Noto'g'ri!");
      setTimeLeft(res.remaining_seconds);

      // Navigation rangini yangilash
      setQuestionStatus((prev) => {
        const updated = [...prev];
        updated[currentIndex] = res.is_correct ? "correct" : "wrong";
        return updated;
      });

      // Variantni saqlash
      setAnswersMap((prev) => ({
        ...prev,
        [currentIndex]: { selectedKey: key, isCorrect: res.is_correct },
      }));

      // Agar backend testni tugatgan bo‘lsa
      if (res.finished) {
        setFinished(true);
        return;
      }

      // ⏭️ 1.5 sekunddan keyin keyingi savolga o‘tish
      setTimeout(() => {
        onAnswered();
      }, 700);

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
