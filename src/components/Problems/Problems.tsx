import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BoxLoader from "../Loaders/BoxLoader/BoxLoader";

/* =======================
   TYPES
======================= */

type MistakeQuestion = {
  id: number;
  text: string;
  image_url?: string | null;
  options: Record<string, string>;
  correct_option: string;
};

/* =======================
   COMPONENT
======================= */

const Problems = () => {
  const navigate = useNavigate();

  const [mistakes, setMistakes] = useState<MistakeQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  /* =======================
     FETCH ON MOUNT
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
          }
        );

        if (!res.ok) throw new Error("Mistakes fetch error");

        const data = await res.json();
        setMistakes(data.questions || data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchMistakes();
  }, []);

  /* =======================
     RENDER
  ======================= */

  if (loading) {
    return (
      <div className="bg-white dark:bg-[#0B142D] rounded-xl p-6 shadow">
        <BoxLoader />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#0B142D] dark:text-white rounded-2xl shadow-xl p-6 mt-8">
      <h2 className="text-xl font-bold mb-2">❗ Problems</h2>

      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Sizda <b>{mistakes.length}</b> ta xato ishlangan test mavjud
      </p>

      <div className="flex gap-4">
        {/* VIEW */}
        <button
          onClick={() => navigate("/home/problems/show")}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
        >
          Xatolarni ko‘rish
        </button>

        {/* RETAKE */}
        <button
          onClick={() => navigate("/test/mistakes")}
          disabled={mistakes.length === 0}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition"
        >
          Qayta ishlash
        </button>
      </div>
    </div>
  );
};

export default Problems;
