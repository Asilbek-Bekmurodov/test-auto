import { useEffect, useState } from "react";
import BoxLoader from "../Loaders/BoxLoader/BoxLoader";

type NewsItem = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

type NewsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: NewsItem[];
};

const MOCK_NEWS: NewsItem[] = [
  {
    id: 1,
    title: "Platformada yangi testlar qo‘shildi",
    content:
      "Endi siz yangi formatdagi testlar orqali bilimlaringizni yanada mustahkamlashingiz mumkin.",
    created_at: "2025-01-01",
  },
  {
    id: 2,
    title: "Imtihon jadvali yangilandi",
    content: "Yanvar oyidagi barcha imtihonlar jadvali qayta ko‘rib chiqildi.",
    created_at: "2025-01-03",
  },
  {
    id: 3,
    title: "Mobil versiya optimallashtirildi",
    content:
      "Saytning mobil qurilmalar uchun ishlashi sezilarli darajada yaxshilandi.",
    created_at: "2025-01-05",
  },
];

export const NewsGrid = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page] = useState(1);
  const pageSize = 20;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `https://imtihongatayyorlov.pythonanywhere.com/news/news/?page=${page}&page_size=${pageSize}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Backend error");

        const data: NewsResponse = await res.json();

        if (data.results && data.results.length > 0) {
          setNews(data.results);
        } else {
          // backend bo‘sh bo‘lsa
          setNews(MOCK_NEWS);
        }
      } catch (error) {
        console.warn("Mock data ishlayapti:", error);
        setNews(MOCK_NEWS);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

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

  return (
    <div className="grid grid-cols-1 dark:text-white gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {news.map((item) => (
        <div
          key={item.id}
          className="rounded-xl border p-4 shadow-sm hover:shadow-md transition"
        >
          <h3 className="font-semibold">{item.title}</h3>
          <p className="text-xs text-gray-500 dark:text-white mt-1">
            {new Date(item.created_at).toLocaleDateString()}
          </p>
          <p className="mt-2 text-sm line-clamp-3">{item.content}</p>
        </div>
      ))}
    </div>
  );
};
