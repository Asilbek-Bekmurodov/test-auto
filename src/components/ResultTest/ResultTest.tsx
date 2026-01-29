import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BoxLoader from "../Loaders/BoxLoader/BoxLoader";

type QuestionResult = {
  id: number;
  text: string;
  image_url?: string | null;
  selected_option: string | null;
  correct_option: string;
  is_correct: boolean;
  options: Record<string, string>;
};

type TestResult = {
  total: number;
  correct: number;
  wrong: number;
  unanswered: number;
  percent: number;
  spent_time: string;
  questions: QuestionResult[];
};

const ResultTest = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [result, setResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      navigate("/");
      return;
    }

    const fetchResult = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers: HeadersInit = {};

        if (token) headers.Authorization = `Bearer ${token}`;

        const res = await fetch(
          `https://imtihongatayyorlov.pythonanywhere.com/tests/sessions/${sessionId}/result/`,
          { headers },
        );

        if (!res.ok) throw new Error(t("resultTest.error"));

        const data: TestResult = await res.json();
        setResult(data);
      } catch {
        setResult(null);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [sessionId, navigate, t]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center dark:bg-[#0B142D]">
        <BoxLoader />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="h-screen flex items-center justify-center text-lg font-semibold">
        {t("resultTest.notFound")}
      </div>
    );
  }

  const { total, correct, wrong, unanswered, percent, spent_time, questions } =
    result;

  console.log(questions);

  return (
    <div className="dark:bg-[#050C1D] min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white dark:bg-[#0B142D] dark:text-white shadow-xl rounded-xl p-6 w-full max-w-3xl">
        <Link
          to="/home"
          className="inline-block mt-4 bg-linear-to-r from-[#3597F9] to-[#462F8F] text-white py-4 px-8 rounded-[30px] text-lg font-semibold hover:scale-105 transition"
        >
          {t("resultTest.home")}
        </Link>

        <h1 className="text-2xl font-bold my-4">{t("resultTest.title")}</h1>

        <div className="grid grid-cols-2 gap-2 mb-6">
          <p>
            {t("resultTest.total")}: <b>{total}</b>
          </p>
          <p>
            {t("resultTest.correct")}: <b>{correct}</b>
          </p>
          <p>
            {t("resultTest.wrong")}: <b>{wrong}</b>
          </p>
          <p>
            {t("resultTest.unanswered")}: <b>{unanswered}</b>
          </p>
          <p>
            {t("resultTest.percent")}: <b>{percent}%</b>
          </p>
          <p>
            {t("resultTest.time")}: <b>{spent_time}</b>
          </p>
        </div>

        <h2 className="text-xl font-semibold mb-3">
          {t("resultTest.questions")}
        </h2>

        <div className="flex flex-col gap-4">
          {questions.map((q, index) => (
            <div
              key={q.id}
              className={`p-4 rounded-lg border ${
                q.is_correct
                  ? "border-green-400 bg-green-50 dark:bg-green-600"
                  : "border-red-400 bg-red-50 dark:bg-red-800"
              }`}
            >
              <p className="font-medium mb-1">
                {index + 1}. {q.text}
              </p>

              {q.image_url && (
                <img
                  src={q.image_url}
                  alt=""
                  className="my-2 max-h-40 object-contain rounded"
                />
              )}

              <p>
                {t("resultTest.yourAnswer")}:{" "}
                <b>{q.selected_option ?? t("resultTest.notSelected")}</b>
              </p>

              {!q.is_correct && (
                <p className="mt-1">
                  {t("resultTest.correctAnswer")}:{" "}
                  <b className="text-green-700 dark:text-green-200">
                    {q.correct_option} — {q.options[q.correct_option]}
                  </b>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultTest;
