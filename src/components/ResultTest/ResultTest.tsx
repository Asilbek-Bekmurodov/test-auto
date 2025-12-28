import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import BoxLoader from "../Loaders/BoxLoader/BoxLoader";

const token = localStorage.getItem("token");
const ResultTest = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const [result, setResult] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      navigate("/"); // agar sessionId bo'lmasa bosh sahifaga yo'naltir
      return;
    }

    const fetchResult = async () => {
      try {
        const res = await fetch(
          `https://imtihongatayyorlov.pythonanywhere.com/tests/sessions/${sessionId}/result/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setResult(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [sessionId, navigate]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <BoxLoader />
      </div>
    );
  if (!result) return <div>Natija topilmadi</div>;

  const { total, correct, wrong, unanswered, percent, spent_time, questions } =
    result;

  return (
    <div className=" min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl">
        <Link to={"/home"} className="text-blue-500">
          Asosiy sahifa
        </Link>
        <h1 className="text-2xl font-bold mb-4">Test Natijasi</h1>

        <div className="mb-4">
          <p>Jami savollar: {total}</p>
          <p>To'g'ri javoblar: {correct}</p>
          <p>Noto'g'ri javoblar: {wrong}</p>
          <p>Javobsiz: {unanswered}</p>
          <p>Natija: {percent}%</p>
          <p>Sarflangan vaqt: {spent_time}</p>
        </div>

        <h2 className="text-xl font-semibold mb-2">Savollar va javoblar:</h2>
        <div className="flex flex-col gap-4 ">
          {questions.map((q: any, index: number) => (
            <div key={q.id} className="p-3 border rounded-lg bg-gray-50">
              <p>
                {index + 1}. {q.text}
              </p>
              {q.image_url && (
                <img
                  src={q.image_url}
                  alt={`question-${q.id}`}
                  className="my-2 max-h-40 object-contain"
                />
              )}
              <p>
                Siz tanlagan javob: <b>{q.selected_option}</b>{" "}
                {q.is_correct ? (
                  <span className="text-green-600 font-semibold">To'g'ri</span>
                ) : (
                  <span className="text-red-600 font-semibold">Noto'g'ri</span>
                )}
              </p>
              <p>To'g'ri javob: {q.correct_option}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultTest;
