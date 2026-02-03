import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BoxLoader from "../Loaders/BoxLoader/BoxLoader";

/* =======================
   TYPES
======================= */

type MistakeQuestion = {
  id: number;
  mistake_count: number;
  last_mistake_at: string;
  text: string;
  image_url: string | null;
  options: Record<string, string>;
  correct_option: string;
};

/* =======================
   COMPONENT
======================= */

const ShowProblems = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [questions, setQuestions] = useState<MistakeQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

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
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!res.ok) throw new Error("Mistakes fetch error");

        const data = await res.json();
        setQuestions(data.questions || data);
      } catch (err) {
        console.error(err);
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
          {show ? t("problems.close") : t("problems.view")}
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
              className="p-4 rounded-lg border border-red-400bg-[#0B142D]"
            >
              {/* QUESTION */}
              <p className="font-medium mb-2">
                {index + 1}. {q.text}
              </p>

              {/* IMAGE */}
              {q.image_url && (
                <img
                  src={q.image_url}
                  alt={`question-${q.id}`}
                  className="my-3 max-h-40 object-contain rounded"
                />
              )}

              {/* OPTIONS */}
              <div className="mt-3 flex flex-col gap-2">
                {Object.entries(q.options).map(([key, value]) => {
                  const isCorrect = key === q.correct_option;

                  return (
                    <div
                      key={key}
                      className={`p-2 rounded-lg border text-sm font-medium
                        ${
                          isCorrect
                            ? "bg-green-100 border-green-500 text-green-800 dark:bg-green-800 dark:text-green-200"
                            : "bg-white border-gray-300 text-gray-800 dark:bg-[#0B142D] dark:border-gray-600 dark:text-gray-200"
                        }`}
                    >
                      <span className="font-bold mr-2">{key}.</span>
                      {value}
                    </div>
                  );
                })}
              </div>

              {/* INFO */}
              {/* <p className="mt-3 text-xs text-gray-600 dark:text-gray-300">
                ❌ Xato soni: <b>{q.mistake_count}</b> · Oxirgi xato:{" "}
                {new Date(q.last_mistake_at).toLocaleDateString()}
              </p> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowProblems;
