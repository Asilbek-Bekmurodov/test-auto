import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../Header/Header";
import QuestionNavigation from "../QuestioinNavigation/QuestionNavigation";
import AnswerList from "../AnswerList/AnswerList";
import QuestionCard from "../QuestionCard/QuestionCard";
import BoxLoader from "../Loaders/BoxLoader/BoxLoader";

import { startTest } from "../../Utilities/Services/startTest";
import type {
  Question,
  StartTestResponse,
} from "../../Utilities/Services/types";
import { isTestType } from "../../Utilities/Services/testConfig";
import type { TestType } from "../../Utilities/Services/testConfig";

import useLocalStorage from "use-local-storage";

/* ================= TYPES ================= */

export type AnswerResult = {
  selectedKey: string;
  isCorrect: boolean;
};

export type QuestionStatus = "unanswered" | "correct" | "wrong";

/* ================= CONSTANTS ================= */

const DEFAULT_DURATION = 20 * 60; // 20 daqiqa

/* ================= COMPONENT ================= */

const Test = () => {
  const navigate = useNavigate();

  const params = useParams<{
    type?: string;
    slug?: string;
    number?: string;
  }>();

  /* ================= VALIDATION ================= */

  if (!isTestType(params.type)) {
    throw new Error("Invalid test type in URL");
  }

  const testType: TestType = params.type;

  /* ================= DARK MODE ================= */

  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [isDark, setIsDark] = useLocalStorage<boolean>("isdark", preference);

  /* ================= STATE ================= */

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(DEFAULT_DURATION);
  const [loading, setLoading] = useState<boolean>(true);
  const [sessionId, setSessionId] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [finished, setFinished] = useState<boolean>(false);
  const [questionStatus, setQuestionStatus] = useState<QuestionStatus[]>([]);
  const [answersMap, setAnswersMap] = useState<Record<number, AnswerResult>>(
    {}
  );
  const [fontScale, setFontScale] = useLocalStorage<number>("fontScale", 1);

  /* ================= EFFECTS ================= */

  // Dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // Fetch test data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: StartTestResponse = await startTest({
          type: testType,
          slug: params.slug,
          number: params.number ? Number(params.number) : undefined,
          language: "uz",
        });

        setQuestions(data.questions);
        setSessionId(data.session.id);
        setQuestionStatus(
          Array<QuestionStatus>(data.questions.length).fill("unanswered")
        );

        if (data.duration) {
          setTimeLeft(data.duration);
        }
      } catch (error) {
        console.error("Test start error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [testType, params.slug, params.number]);

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Font scale
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontScale * 16}px`;
  }, [fontScale]);

  // Finish test
  useEffect(() => {
    if (finished) {
      navigate(`/result/${sessionId}`);
    }
  }, [finished, navigate, sessionId]);

  /* ================= HELPERS ================= */

  const increaseFont = () =>
    setFontScale((prev = 1) => Math.min(prev + 0.1, 1.8));

  const decreaseFont = () =>
    setFontScale((prev = 1) => Math.max(prev - 0.1, 0.8));

  /* ================= RENDER ================= */

  if (loading || questions.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <BoxLoader />
      </div>
    );
  }

  const currentQuestion: Question = questions[currentIndex];

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
          {feedback && (
            <div className="text-center mb-2 font-semibold">{feedback}</div>
          )}

          <div className="p-5 rounded-2xl bg-[#f7f7f7] mb-6">
            <h3 className="text-[1.5rem]">
              {currentIndex + 1}. Savol: {currentQuestion.text}
            </h3>
          </div>

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
