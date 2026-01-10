import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BoxLoader from "../Loaders/BoxLoader/BoxLoader";

/* =======================
   TYPES
======================= */

type LangText = {
  uz?: string;
  uz_cyrl?: string;
  kaa?: string;
  ru?: string;
};

type MistakeQuestion = {
  id: number;
  mistake_count: number;
  last_mistake_at: string;
  text: LangText;
  image: string | null;
  options: Record<string, LangText>;
  correct_option: string;
};

/* =======================
   HELPERS
======================= */

const getLangText = (obj: LangText | undefined, lang: string) => {
  if (!obj) return "";

  switch (lang) {
    case "uz":
      return obj.uz || obj.uz_cyrl || obj.ru || obj.kaa || "";
    case "krill":
    case "uz_cyrl":
      return obj.uz_cyrl || obj.uz || obj.ru || obj.kaa || "";
    case "ru":
      return obj.ru || obj.uz || obj.uz_cyrl || obj.kaa || "";
    case "qa":
    case "kaa":
      return obj.kaa || obj.uz || obj.uz_cyrl || obj.ru || "";
    default:
      return obj.uz || obj.ru || "";
  }
};

/* =======================
   COMPONENT
======================= */

const ShowProblems = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [questions, setQuestions] = useState<MistakeQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  const lang = i18n.resolvedLanguage; // 👈 HOZIRGI TIL

  /* =======================
     FETCH
  ======================= */

  useEffect(() => {
    const fetchMistakes = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "https://imtihongatayyorlov.pythonanywhere.com/tests/mistakes/read/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) throw new Error("Mistakes fetch error");

        const data = await res.json();
        setQuestions(data.questions || data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchMistakes();
  }, []);

  /* =======================
     LOADING
  ======================= */

  if (loading) {
    return (
      <div
        style={{ height: "calc(100vh - 120px)" }}
        className="bg-white dark:bg-[#0B142D] flex items-center justify-center rounded-xl p-6 shadow"
      >
        <BoxLoader />
      </div>
    );
  }

  /* =======================
     RENDER
  ======================= */

  return (
    <div className="bg-white dark:bg-[#0B142D] dark:text-white rounded-2xl shadow-xl p-6 mt-8">
      <h2 className="text-xl font-bold mb-2">❗ {t("problems.title")}</h2>

      <p className="text-gray-600 dark:text-gray-300 mb-6">
        {t("problems.description", { count: questions.length })}
      </p>

      {/* ACTIONS */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShow((p) => !p)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
        >
          {show ? t("common.close") : t("problems.view")}
        </button>

        <button
          onClick={() => navigate("/test/mistakes")}
          disabled={questions.length === 0}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition"
        >
          {t("problems.retry")}
        </button>
      </div>

      {/* MISTAKES LIST */}
      {show && (
        <div className="flex flex-col gap-4">
          {questions.map((q, index) => (
            <div
              key={q.id}
              className="p-4 rounded-lg border border-red-400 bg-red-50 dark:bg-red-800"
            >
              <p className="font-medium mb-1">
                {index + 1}. {getLangText(q.text, lang as string)}
              </p>

              {q.image && (
                <img
                  src={q.image}
                  alt={`question-${q.id}`}
                  className="my-2 max-h-40 object-contain rounded"
                />
              )}

              <p className="mt-1">
                {t("problems.correctAnswer")}{" "}
                <b className="text-green-700 dark:text-green-200">
                  {q.correct_option} —{" "}
                  {getLangText(q.options[q.correct_option], lang as string)}
                </b>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowProblems;
