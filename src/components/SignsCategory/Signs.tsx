import { useEffect, useMemo, useState } from "react";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import BoxLoader from "../Loaders/BoxLoader/BoxLoader";
import categoryImages from "./data.json";

const BASE_URL = "https://imtihongatayyorlov.pythonanywhere.com";

type SignItem = {
  id: number;
  title?: string;
  name?: string;
  image?: string;
  description?: string;
  raqam_belgisi?: string;
  nomi?: string;
  category?: string;
  thumbnail?: string;
  images_count?: number;
  has_images?: boolean;
};

type SignCategory = {
  id: number;
  title?: string;
  name?: string;
  description?: string;
  image?: string;
  sign_count?: number;
  signs?: SignItem[];
};

const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const extractList = <T,>(payload: unknown): T[] => {
  if (Array.isArray(payload)) return payload as T[];
  if (
    payload &&
    typeof payload === "object" &&
    "results" in payload &&
    Array.isArray((payload as { results: T[] }).results)
  ) {
    return (payload as { results: T[] }).results;
  }
  if (
    payload &&
    typeof payload === "object" &&
    "items" in payload &&
    Array.isArray((payload as { items: T[] }).items)
  ) {
    return (payload as { items: T[] }).items;
  }
  if (
    payload &&
    typeof payload === "object" &&
    "data" in payload &&
    Array.isArray((payload as { data: T[] }).data)
  ) {
    return (payload as { data: T[] }).data;
  }
  return [];
};

const extractCategories = (payload: unknown): SignCategory[] => {
  if (
    payload &&
    typeof payload === "object" &&
    "categories" in payload &&
    Array.isArray((payload as { categories: SignCategory[] }).categories)
  ) {
    return (payload as { categories: SignCategory[] }).categories;
  }
  if (
    payload &&
    typeof payload === "object" &&
    "sign_categories" in payload &&
    Array.isArray(
      (payload as { sign_categories: SignCategory[] }).sign_categories,
    )
  ) {
    return (payload as { sign_categories: SignCategory[] }).sign_categories;
  }
  return extractList<SignCategory>(payload);
};

const getTitle = (item?: {
  title?: string;
  name?: string;
  nomi?: string;
  id?: number;
}) => {
  if (!item) return "Kategoriya";
  return (
    item.title || item.nomi || item.name || `Kategoriya ${item.id ?? ""}`.trim()
  );
};

const normalizeImageUrl = (url?: string) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    if (url.includes("#/media/")) {
      const raw = url.split("#/media/")[1] || "";
      const decoded = decodeURIComponent(raw);
      const filename = decoded
        .replace(/^Fayl:/i, "")
        .replace(/^File:/i, "")
        .trim();
      if (filename) {
        try {
          const parsed = new URL(url);
          return `${parsed.origin}/wiki/Special:FilePath/${encodeURIComponent(
            filename,
          )}`;
        } catch {
          return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
            filename,
          )}`;
        }
      }
    }
    return url;
  }
  return `${BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
};

const getImage = (item?: { image?: string; thumbnail?: string }) =>
  normalizeImageUrl(item?.thumbnail || item?.image || "");

const categoryImageMap = new Map<number, string>(
  (categoryImages.imgs || []).map((item) => [item.id, item.image]),
);

const getCategoryImage = (category?: { id?: number; image?: string }) => {
  if (category?.image) return getImage({ image: category.image });
  const id = category?.id;
  if (!id) return "";
  const fallback = categoryImageMap.get(id);
  return normalizeImageUrl(fallback);
};

const SignCategories = () => {
  const [categories, setCategories] = useState<SignCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${BASE_URL}/sign-categories/`, {
          headers: {
            ...getAuthHeaders(),
          },
        });

        if (!res.ok) throw new Error("Sign categories not found");

        const data = await res.json();
        setCategories(extractCategories(data));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
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

  if (!categories.length) {
    return (
      <div className="bg-white dark:bg-[#0B142D] rounded-2xl p-8 text-center text-gray-600 dark:text-gray-300">
        Sign categories topilmadi.
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-6 p-4">
      {categories
        .filter((category) => category.id !== 9)
        .map((category) => {
        const title = getTitle(category);
        const image = getCategoryImage(category);
        const count =
          typeof category.sign_count === "number"
            ? `${category.sign_count} ta belgi`
            : "";

        return (
          <li key={category.id}>
            <Link
              to={`${category.id}`}
              state={{ category }}
              className="group block rounded-[32px] border border-[#e5e7eb] dark:border-slate-700 bg-white dark:bg-[#0B142D] shadow-[0_10px_30px_rgba(17,24,39,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(17,24,39,0.12)]"
            >
              <div className="flex flex-col items-center justify-between gap-6 p-6 md:flex-row md:p-10">
                <div className="max-w-xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4C7CF9]">
                    Sign categories
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold uppercase text-black dark:text-white md:text-3xl">
                    {title}
                  </h3>
                  {category.description && (
                    <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                      {category.description}
                    </p>
                  )}
                  {count && (
                    <span className="mt-4 inline-flex items-center rounded-full border border-[#D7E3FF] bg-[#EFF4FF] px-4 py-2 text-xs font-semibold text-[#2A57D4]">
                      {count}
                    </span>
                  )}
                </div>

                <div className="relative flex h-[190px] w-full max-w-[420px] items-center justify-center md:h-[220px]">
                  <div className="absolute -bottom-4 right-6 h-20 w-44 rounded-full bg-[#0B4CF3]/20 blur-2xl" />
                  {image ? (
                    <img
                      src={image}
                      alt={title}
                      className="relative h-full w-full object-contain"
                    />
                  ) : (
                    <div className="relative flex h-full w-full items-center justify-center rounded-2xl border border-dashed border-[#C7D7FF] bg-[#F6F9FF] text-sm font-semibold text-[#6A7DB5]">
                      Rasm mavjud emas
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

const SignCategoryDetail = () => {
  const { categoryId } = useParams();
  const location = useLocation();
  const stateCategory = useMemo(() => {
    const state = location.state as { category?: SignCategory } | null;
    return state?.category;
  }, [location.state]);

  const [category, setCategory] = useState<SignCategory | undefined>(
    stateCategory,
  );
  const [signs, setSigns] = useState<SignItem[]>(stateCategory?.signs ?? []);
  const [loading, setLoading] = useState(true);
  const [selectedSign, setSelectedSign] = useState<SignItem | null>(null);

  const categoryName = useMemo(() => getTitle(category), [category]);
  const filteredSigns = useMemo(() => {
    const name = categoryName.trim().toLowerCase();
    if (!name) return signs;
    return signs.filter((sign) =>
      (sign.category || "").trim().toLowerCase().includes(name),
    );
  }, [categoryName, signs]);

  useEffect(() => {
    const loadCategory = async () => {
      if (!categoryId) return;
      try {
        const headers = {
          ...getAuthHeaders(),
        };

        const signsRes = await fetch(
          `${BASE_URL}/signs/?search=${categoryId}`,
          { headers },
        );

        if (signsRes.ok) {
          const signsData = await signsRes.json();
          setSigns(extractList<SignItem>(signsData));
          if (!stateCategory && Array.isArray(signsData) && signsData[0]) {
            setCategory((prev) => ({
              ...prev,
              id: Number(categoryId),
              name:
                signsData[0].category ||
                signsData[0].title ||
                signsData[0].nomi,
            }));
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadCategory();
  }, [categoryId, stateCategory]);

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
    <div className="p-4">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-[#e5e7eb] dark:border-slate-700 bg-white dark:bg-[#0B142D] p-6 shadow-sm">
        <div>
          <Link
            to="/home/education/signs"
            className="text-sm font-semibold text-[#2A57D4] hover:underline"
          >
            ← Orqaga qaytish
          </Link>
          <h2 className="mt-2 text-2xl font-semibold uppercase text-black dark:text-white">
            {getTitle(category)}
          </h2>
          {category?.description && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {category.description}
            </p>
          )}
        </div>
        {category?.image && (
          <img
            src={category.image}
            alt={getTitle(category)}
            className="h-24 w-40 object-contain"
          />
        )}
      </div>

      {!filteredSigns.length ? (
        <div className="mt-6 rounded-2xl border border-dashed border-[#C7D7FF] bg-[#F6F9FF] p-8 text-center text-sm font-semibold text-[#6A7DB5] dark:border-slate-700 dark:bg-[#0B142D] dark:text-gray-300">
          Bu kategoriya uchun ma'lumot topilmadi.
        </div>
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSigns.map((sign) => {
            const title = getTitle(sign);
            const image = getImage(sign);
            return (
              <li
                key={sign.id}
                className="group rounded-3xl border border-[#e5e7eb] dark:border-slate-700 bg-white dark:bg-[#0B142D] p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(15,23,42,0.12)]"
                onClick={() => setSelectedSign(sign)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    setSelectedSign(sign);
                  }
                }}
              >
                <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-[#F6F9FF] dark:bg-[#091025]">
                  {image ? (
                    <img
                      src={image}
                      alt={title}
                      referrerPolicy="no-referrer"
                      className="h-28 w-28 object-contain transition group-hover:scale-105"
                      onError={(event) => {
                        const target = event.currentTarget;
                        target.onerror = null;
                        const svg =
                          "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>" +
                          "<rect width='100%' height='100%' fill='#F6F9FF'/>" +
                          "<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#6A7DB5' font-size='14' font-family='Arial'>Rasm yo'q</text>" +
                          "</svg>";
                        target.src =
                          "data:image/svg+xml;utf8," + encodeURIComponent(svg);
                      }}
                    />
                  ) : (
                    <span className="text-xs font-semibold text-[#6A7DB5] dark:text-gray-300">
                      Rasm yo‘q
                    </span>
                  )}
                </div>
                <div className="mt-4 flex items-center justify-between text-xs font-semibold uppercase text-[#2A57D4]">
                  <span>{sign.raqam_belgisi || "—"}</span>
                  <span className="rounded-full bg-[#EFF4FF] px-3 py-1 text-[10px] text-[#2A57D4]">
                    {sign.category || getTitle(category)}
                  </span>
                </div>
                <p className="mt-3 text-center text-sm font-semibold uppercase text-black dark:text-white">
                  {title}
                </p>
              </li>
            );
          })}
        </ul>
      )}

      {selectedSign && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedSign(null)}
        >
          <div
            className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl dark:bg-[#0B142D]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="flex w-full items-center justify-center rounded-2xl bg-[#F6F9FF] p-6 dark:bg-[#091025] md:w-1/2">
                {getImage(selectedSign) ? (
                  <img
                    src={getImage(selectedSign)}
                    alt={getTitle(selectedSign)}
                    referrerPolicy="no-referrer"
                    className="h-56 w-56 object-contain"
                    onError={(event) => {
                      const target = event.currentTarget;
                      target.onerror = null;
                      const svg =
                        "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>" +
                        "<rect width='100%' height='100%' fill='#F6F9FF'/>" +
                        "<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#6A7DB5' font-size='14' font-family='Arial'>Rasm yo'q</text>" +
                        "</svg>";
                      target.src =
                        "data:image/svg+xml;utf8," + encodeURIComponent(svg);
                    }}
                  />
                ) : (
                  <div className="text-sm font-semibold text-[#6A7DB5]">
                    Rasm yo‘q
                  </div>
                )}
              </div>
              <div className="flex w-full flex-col justify-between md:w-1/2">
                <div>
                  <div className="text-xs font-semibold uppercase text-[#2A57D4]">
                    {selectedSign.raqam_belgisi || "—"}
                  </div>
                  <h3 className="mt-2 text-xl font-semibold uppercase text-black dark:text-white">
                    {getTitle(selectedSign)}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {selectedSign.description ||
                      selectedSign.category ||
                      "Tasnif mavjud emas."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedSign(null)}
                  className="mt-6 w-full rounded-2xl bg-[#2A57D4] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1E45B8]"
                >
                  Tushunarli
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Signs = () => {
  return (
    <Routes>
      <Route index element={<SignCategories />} />
      <Route path=":categoryId" element={<SignCategoryDetail />} />
    </Routes>
  );
};

export default Signs;
