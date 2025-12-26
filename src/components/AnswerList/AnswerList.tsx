import { useState, useEffect } from "react";
import type { Prep20Question } from "../../Utilities/Services/startPrep20.ts";
import AnswerItem from "../AnswerItem/AnswerItem";

interface AnswerListProps {
  question: Prep20Question | null;
  sessionId: string;
  setTimeLeft: (seconds: number) => void;
  setFeedback: (message: string) => void;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setFinished: (finished: boolean) => void;
}

const token = localStorage.getItem("token");
const AnswerList = ({
  question,
  sessionId,
  setTimeLeft,
  setFeedback,
  setFinished,
}: AnswerListProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [correctness, setCorrectness] = useState<boolean | null>(null);

  // ❗ CurrentQuestion o‘zgarganda tanlovni reset qilish
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSelectedIndex(null);
      setCorrectness(null);
    }, 0);
    return () => clearTimeout(timeout);
  }, [question]);

  if (!question || !question.options) return null;

  const optionsArray = Object.entries(question.options);

  const handleClick = async (index: number, key: string) => {
    if (selectedIndex !== null) return; // javob allaqachon tanlangan

    setSelectedIndex(index);

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

    setCorrectness(res.is_correct);
    setFeedback(res.is_correct ? "To'g'ri!" : "Noto'g'ri!");
    setTimeLeft(res.remaining_seconds);

    if (res.finished) setFinished(true);
  };

  return (
    <div className="w-[50%] col-span-2 flex flex-col gap-4">
      {optionsArray.map(([key, text], index) => (
        <AnswerItem
          key={key}
          text={`${key}: ${text}`}
          active={selectedIndex === index}
          correct={selectedIndex === index ? correctness : undefined}
          onClick={() => handleClick(index, key)}
        />
      ))}
    </div>
  );
};

export default AnswerList;
