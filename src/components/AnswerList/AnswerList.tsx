import { useEffect, useRef } from "react";
import type { Question } from "../../Utilities/Services/types";
import AnswerItem from "../AnswerItem/AnswerItem";
import type { AnswerResult, QuestionStatus } from "../Test/Test";

interface AnswerListProps {
  question: Question | null;
  sessionId: string;
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
  setFinished,
  currentIndex,
  setQuestionStatus,
  answersMap,
  setAnswersMap,
  finished,
  onAnswered,
}: AnswerListProps) => {
  const optionsArray = question?.options
    ? Object.entries(question.options)
    : [];

  const savedAnswer = answersMap[currentIndex];

  // 🔒 GLOBAL LOCK (keyboard + mouse)
  const submittingRef = useRef(false);

  const handleClick = async (key: string) => {
    if (!question || savedAnswer || finished) return;

    // 🔒 double submit protection
    if (submittingRef.current) return;
    submittingRef.current = true;

    try {
      const token = localStorage.getItem("token");

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

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
        },
      );

      if (!res.ok) throw new Error("Answer submit failed");

      const data = await res.json();
      console.log(data);

      // status update
      setQuestionStatus((prev) => {
        const updated = [...prev];
        updated[currentIndex] = data.is_correct ? "correct" : "wrong";
        return updated;
      });

      // save answer
      setAnswersMap((prev) => ({
        ...prev,
        [currentIndex]: {
          selectedKey: key,
          isCorrect: data.is_correct,
          correctOption: data.correct_option,
        },
      }));

      if (data.finished) {
        setFinished(true);
      }

      // next question
      setTimeout(() => {
        submittingRef.current = false; // 🔓 unlock
        onAnswered();
      }, 700);
    } catch (err) {
      submittingRef.current = false;
      console.error("Javob yuborishda xatolik:", err);
    }
  };

  // ⌨️ KEYBOARD SUPPORT (F1–F5)
  useEffect(() => {
    if (!question || finished || savedAnswer) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (submittingRef.current) return;

      const keyMap: Record<string, string | undefined> = {
        F1: optionsArray[0]?.[0],
        F2: optionsArray[1]?.[0],
        F3: optionsArray[2]?.[0],
        F4: optionsArray[3]?.[0],
        F5: optionsArray[4]?.[0],
      };

      const selectedOption = keyMap[e.key];

      if (selectedOption) {
        e.preventDefault(); // F1 help, F5 refresh block
        handleClick(selectedOption);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [question, optionsArray, savedAnswer, finished]);

  if (!question || !question.options) return null;

  return (
    <div className="w-full min-h-[400px] col-span-2 flex flex-col gap-4">
      {optionsArray.map(([key, text]) => {
        const answer = savedAnswer;

        const isSelected = answer?.selectedKey === key;

        // 👇 agar bu to‘g‘ri javob bo‘lsa
        const isCorrectOption = answer?.correctOption === key;

        let correctProp: boolean | null = null;

        if (isCorrectOption) {
          correctProp = true; // yashil
        } else if (isSelected && answer && !answer.isCorrect) {
          correctProp = false; // qizil
        }

        return (
          <AnswerItem
            key={key}
            text={`${key}: ${text}`}
            active={isSelected}
            correct={correctProp}
            onClick={() => handleClick(key)}
          />
        );
      })}
    </div>
  );
};

export default AnswerList;
