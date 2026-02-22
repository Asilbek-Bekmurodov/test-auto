import { useMemo, useState } from "react";
import definitions from "./Yoʻl harakati qoidalarini tasnifi.json";

type DefinitionItem = {
  atam: string;
  izoh: string;
};

const items = definitions as DefinitionItem[];

function Atamalar() {
  const [selectedItem, setSelectedItem] = useState<DefinitionItem | null>(null);
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return items;
    return items.filter((item) =>
      item.atam.toLowerCase().includes(value),
    );
  }, [query]);

  return (
    <div className="p-4">
      <div className="rounded-3xl border border-[#e5e7eb] dark:border-slate-700 bg-white dark:bg-[#0B142D] p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold uppercase text-black dark:text-white">
              Yo‘l harakati atamalari
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Qoidalar bo‘yicha asosiy atamalar va ularning izohlari.
            </p>
          </div>
          <div className="w-full md:max-w-sm">
            <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4C7CF9]">
              Atama qidirish
            </label>
            <div className="mt-2 flex items-center gap-2 rounded-2xl border border-[#e5e7eb] bg-[#F6F9FF] px-4 py-3 dark:border-slate-700 dark:bg-[#091025]">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Masalan: avtomagistral"
                className="w-full bg-transparent text-sm text-black outline-none placeholder:text-gray-400 dark:text-white"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="text-xs font-semibold text-[#2A57D4] hover:underline"
                >
                  Tozalash
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item, index) => (
          <li
            key={`${item.atam}-${index}`}
            className="group rounded-3xl border border-[#e5e7eb] dark:border-slate-700 bg-white dark:bg-[#0B142D] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(15,23,42,0.12)]"
            role="button"
            tabIndex={0}
            onClick={() => setSelectedItem(item)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                setSelectedItem(item);
              }
            }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4C7CF9]">
              Atama
            </div>
            <h3 className="mt-3 text-lg font-semibold uppercase text-black dark:text-white">
              {item.atam}
            </h3>
            <div className="mt-4 h-px w-full bg-[#EEF1F7] dark:bg-slate-700" />
            <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {item.izoh}
            </p>
          </li>
        ))}
      </ul>

      {!filteredItems.length && (
        <div className="mt-6 rounded-2xl border border-dashed border-[#C7D7FF] bg-[#F6F9FF] p-8 text-center text-sm font-semibold text-[#6A7DB5] dark:border-slate-700 dark:bg-[#0B142D] dark:text-gray-300">
          Hech qanday natija topilmadi.
        </div>
      )}

      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl dark:bg-[#0B142D]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4C7CF9]">
              Atama
            </div>
            <h3 className="mt-2 text-2xl font-semibold uppercase text-black dark:text-white">
              {selectedItem.atam}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {selectedItem.izoh}
            </p>

            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="mt-6 w-full rounded-2xl bg-[#2A57D4] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1E45B8]"
            >
              Tushunarli
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Atamalar;
