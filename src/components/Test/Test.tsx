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

const TOTAL_DURATION = 60 * 20; // 1 soat
const MAX_WRONG = 3;

/* ================= COMPONENT ================= */

const Test = () => {
  const navigate = useNavigate();

  const params = useParams<{
    type?: string;
    slug?: string;
    number?: string;
  }>();

  let testType: TestType;

  if (params.type && isTestType(params.type)) {
    testType = params.type;
  } else if (params.slug) {
    testType = "topic";
  } else if (params.number) {
    testType = "ticket";
  } else {
    throw new Error("Invalid test route");
  }

  /* ================= DARK MODE ================= */

  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage<boolean>("isdark", preference);

  /* ================= STATE ================= */

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(TOTAL_DURATION);
  const [loading, setLoading] = useState<boolean>(true);
  const [sessionId, setSessionId] = useState<string>("");
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

        // ✅ duration bo‘lsa uni ishlat, yo‘q bo‘lsa har bir savolga 60s
        setTimeLeft(data.duration ?? data.questions.length * 60);
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
      setTimeLeft((prev) => {
        if (prev > 0) return prev - 1;
        setFinished(true);
        return 0;
      });
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

  // 3 ta xato qoidasini ishlash
  useEffect(() => {
    if (testType !== "real") return;

    const wrongCount = Object.values(answersMap).filter(
      (a) => !a.isCorrect
    ).length;
    if (wrongCount >= MAX_WRONG && !finished) {
      alert("❌ 3 ta xato qilindi. Real imtihon yakunlandi!");
      setFinished(true);
    }
  }, [answersMap, finished, testType]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue =
        "Sahifani yangilasangiz test boshidan boshlanadi. Davom etasizmi?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  /* ================= HELPERS ================= */

  const goToNextUnanswered = () => {
    setCurrentIndex((prev) => {
      for (let i = prev + 1; i < questions.length; i++) {
        if (!answersMap[i]) return i;
      }
      for (let i = 0; i < questions.length; i++) {
        if (!answersMap[i]) return i;
      }
      setFinished(true);
      return prev;
    });
  };

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
        onFinish={() => {
          if (confirm("Testni yakunlamoqchimisiz?")) {
            setFinished(true);
          }
        }}
      />

      <div className="h-[90vh] bg-gray-100 flex justify-center items-center p-6">
        <div className="w-full max-w-6xl bg-white rounded-2xl p-6 shadow-lg">
          {/* {feedback && (
            <div className="text-center mb-2 font-semibold">{feedback}</div>
          )} */}

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
              setCurrentIndex={setCurrentIndex}
              setFinished={setFinished}
              currentIndex={currentIndex}
              setQuestionStatus={setQuestionStatus}
              answersMap={answersMap}
              setAnswersMap={setAnswersMap}
              finished={finished}
              onAnswered={goToNextUnanswered}
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
