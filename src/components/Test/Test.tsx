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

const Test = () => {
  const navigate = useNavigate();
  const preference: boolean = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const [isDark, setIsDark] = useLocalStorage<boolean>("isdark", preference);

  const [questions, setQuestions] = useState<Prep20Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [finished, setFinished] = useState(false);

  // Dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // Backenddan ma'lumot olish
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: StartPrep20Response = await startPrep20("uz");

        setQuestions(data.questions);
        setTimeLeft(data.duration);
        setSessionId(data.session.id); // session_id saqlaymiz
      } catch (err) {
        console.error("Xatolik:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  // Test tugaganda natija sahifasiga navigate qilish
  useEffect(() => {
    if (finished) {
      navigate(`/result/${sessionId}`);
    }
  }, [finished, navigate, sessionId]);

  if (loading) return <div>Loading...</div>;

  const currentQuestion = questions[currentIndex];

  return (
    <>
      <Header isDark={isDark} setIsDark={setIsDark} />

      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
        <div className="w-full max-w-6xl bg-white rounded-2xl p-6 shadow-lg">
          {/* Timer */}
          <div className="text-right text-lg font-semibold mb-2">
            ⏱ {Math.floor(timeLeft / 60)}:
            {String(timeLeft % 60).padStart(2, "0")}
          </div>

          {/* Feedback */}
          {feedback && (
            <div className="text-center mb-2 font-semibold">{feedback}</div>
          )}

          {/* Savol */}
          <div className="h-30 p-5 rounded-2xl bg-amber-200 mb-6">
            <h3>
              {currentIndex + 1}. Savol: {currentQuestion?.text}
            </h3>
          </div>

          {/* Javoblar */}
          <div className="flex gap-4">
            <QuestionCard question={currentQuestion} />
            <AnswerList
              question={currentQuestion}
              sessionId={sessionId}
              setTimeLeft={setTimeLeft}
              setFeedback={setFeedback}
              setCurrentIndex={setCurrentIndex}
              setFinished={setFinished}
            />
          </div>

          <QuestionNavigation
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            total={questions.length}
          />
        </div>
      </div>
    </>
  );
};

export default Test;
