import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import Header from "../Header/Header";
import QuestionNavigation from "../QuestioinNavigation/QuestionNavigation";
import {
  type StartPrep20Response,
  type Prep20Question,
  startPrep20,
} from "../../Utilities/Services/startPrep20.ts";
import AnswerList from "../AnswerList/AnswerList.tsx";
import QuestionCard from "../QuestionCard/QuestionCard.tsx";
import BoxLoader from "../Loaders/BoxLoader/BoxLoader.tsx";

export type AnswerResult = {
  selectedKey: string;
  isCorrect: boolean;
};

export type QuestionStatus = "unanswered" | "correct" | "wrong";

const DEFAULT_DURATION = 20 * 60; // 20 daqiqa

const Test = () => {
  const navigate = useNavigate();

  // Dark mode
  const preference: boolean = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const [isDark, setIsDark] = useLocalStorage<boolean>("isdark", preference);

  // State
  const [questions, setQuestions] = useState<Prep20Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number>(DEFAULT_DURATION);
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [finished, setFinished] = useState(false);
  const [questionStatus, setQuestionStatus] = useState<QuestionStatus[]>([]);
  const [answersMap, setAnswersMap] = useState<Record<number, AnswerResult>>(
    {}
  );
  const [fontScale, setFontScale] = useLocalStorage<number>("fontScale", 1);

  // Dark mode effect
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // Backend fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: StartPrep20Response = await startPrep20("uz");

        setQuestions(data.questions);
        setSessionId(data.session.id);

        setQuestionStatus(Array(data.questions.length).fill("unanswered"));

        // Backenddan kelgan duration bilan yangilash
        if (data.duration) setTimeLeft(data.duration);
      } catch (err) {
        console.error("Xatolik:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Timer: sahifaga kirishi bilan ishlashni boshlaydi
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontScale * 16}px`;
  }, [fontScale]);

  // Test tugagach result sahifaga navigate qilish
  useEffect(() => {
    if (finished) {
      navigate(`/result/${sessionId}`);
    }
  }, [finished, navigate, sessionId]);

  if (loading || !questions.length)
    return (
      <div className="h-screen flex items-center justify-center">
        <BoxLoader />
      </div>
    );

  const increaseFont = () =>
    setFontScale((prev = 1) => Math.min(prev + 0.1, 1.8));

  const decreaseFont = () =>
    setFontScale((prev = 1) => Math.max(prev - 0.1, 0.8));

  const currentQuestion = questions[currentIndex];

  return (
    <>
      <Header
        timeLeft={timeLeft}
        isDark={isDark}
        setIsDark={setIsDark}
        increaseFont={increaseFont}
        decreaseFont={decreaseFont}
      />

      <div className="h-[90vh] bg-gray-100 flex justify-center items-center p-6">
        <div className="w-full max-w-6xl bg-white rounded-2xl p-6 shadow-lg">
          {/* Feedback */}
          {feedback && (
            <div className="text-center mb-2 font-semibold">{feedback}</div>
          )}

          {/* Question */}
          <div className="h-30 p-5 rounded-2xl bg-[#f7f7f7] mb-6">
            <h3 className="text-[1.5rem]">
              {currentIndex + 1}. Savol: {currentQuestion?.text}
            </h3>
          </div>

          {/* Answers */}
          <div className="flex gap-4 items-start">
            <QuestionCard question={currentQuestion} />
            <AnswerList
              question={currentQuestion}
              sessionId={sessionId}
              setTimeLeft={setTimeLeft}
              setFeedback={setFeedback}
              setCurrentIndex={setCurrentIndex}
              setFinished={setFinished}
              currentIndex={currentIndex}
              setQuestionStatus={setQuestionStatus}
              answersMap={answersMap}
              setAnswersMap={setAnswersMap}
            />
          </div>

          {/* Navigation */}
          <QuestionNavigation
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            total={questions.length}
            questionStatus={questionStatus}
          />
        </div>
      </div>
    </>
  );
};

export default Test;
