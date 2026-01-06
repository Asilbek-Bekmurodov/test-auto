import { useEffect, useState } from "react";

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

export const NewsGrid = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(20); // xohlasang o‘zgartirasan
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        const res = await fetch(
          `https://imtihongatayyorlov.pythonanywhere.com/news/news/?page=${page}&page_size=${pageSize}&ordering=-created_at`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("News not found");

        const data: NewsResponse = await res.json();

        setNews(data.results);
        setTotal(data.count);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [page, pageSize]);

  const totalPages = Math.ceil(total / pageSize);

  if (loading) {
    return <p className="p-4">Yuklanmoqda...</p>;
  }

  return (
    <div className="p-4 space-y-6">
      {/* NEWS GRID */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {news.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border p-4 shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(item.created_at).toLocaleDateString()}
            </p>
            <p className="mt-2 text-sm line-clamp-3">{item.content}</p>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-center gap-3">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Oldingi
        </button>

        <span className="text-sm">
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Keyingi
        </button>
      </div>
    </div>
  );
};
