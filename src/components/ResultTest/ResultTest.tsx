import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import BoxLoader from "../Loaders/BoxLoader/BoxLoader";

/* =======================
   TYPES
======================= */

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

/* =======================
   COMPONENT
======================= */

const ResultTest = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();

  const [result, setResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!sessionId) {
      navigate("/");
      return;
    }

    const fetchResult = async () => {
      try {
        const token = localStorage.getItem("token");

        const headers: HeadersInit = {};

        // token bo‘lsa qo‘shiladi, bo‘lmasa yo‘q
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const res = await fetch(
          `https://imtihongatayyorlov.pythonanywhere.com/tests/sessions/${sessionId}/result/`,
          { headers }
        );

        if (!res.ok) {
          throw new Error("Natijani olishda xatolik");
        }

        const data: TestResult = await res.json();
        setResult(data);
      } catch (error) {
        console.error("Result fetch error:", error);
        setResult(null);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [sessionId, navigate]);

  /* =======================
     RENDER STATES
  ======================= */

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center dark:bg-[#0B142D] dark:text-white">
        <BoxLoader />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="h-screen flex items-center justify-center text-lg font-semibold ">
        Natija topilmadi
      </div>
    );
  }

  const { total, correct, wrong, unanswered, percent, spent_time, questions } =
    result;

  return (
    <div className="dark:bg-[#050C1D]   min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white dark:bg-[#0B142D] dark:text-white shadow-xl rounded-xl p-6 w-full max-w-3xl">
        <Link
          to="/home"
          className="inline-block mt-4 bg-linear-to-r from-[#3597F9] to-[#462F8F] text-white py-4 px-8 rounded-[30px] text-lg font-semibold hover:scale-105 transition"
        >
          ← Asosiy sahifa
        </Link>

        <h1 className="text-2xl font-bold my-4">Test Natijasi</h1>

        <div className="grid grid-cols-2 gap-2 mb-6">
          <p>
            📊 Jami savollar: <b>{total}</b>
          </p>
          <p>
            ✅ To‘g‘ri: <b>{correct}</b>
          </p>
          <p>
            ❌ Noto‘g‘ri: <b>{wrong}</b>
          </p>
          <p>
            ➖ Javobsiz: <b>{unanswered}</b>
          </p>
          <p>
            🎯 Natija: <b>{percent}%</b>
          </p>
          <p>
            ⏱ Sarflangan vaqt: <b>{spent_time}</b>
          </p>
        </div>

        <h2 className="text-xl font-semibold mb-3">Savollar va javoblar</h2>

        <div className="flex flex-col gap-4">
          {questions.map((q, index) => (
            <div
              key={q.id}
              className={`p-4 rounded-lg border  ${
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
                  alt={`question-${q.id}`}
                  className="my-2 max-h-40 object-contain rounded"
                />
              )}

              <p>
                Siz tanlagan javob: <b>{q.selected_option ?? "Tanlanmagan"}</b>
              </p>

              {!q.is_correct && (
                <p className="mt-1">
                  To‘g‘ri javob:{" "}
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
