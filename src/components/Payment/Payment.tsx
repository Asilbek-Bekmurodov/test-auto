import { useState } from "react";
import { plans, stats, type Plan } from "../../pages/Data";
import Image from "../Image/Image";

export default function Payment() {
  const [selected, setSelected] = useState<Plan>(plans[0]);

  return (
    <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="bg-white rounded-2xl border p-6 grid grid-cols-2 gap-4">
        {stats.map((s) => (
          <div key={s.title} className="rounded-xl border p-4">
            <div className="text-sm text-gray-500">{s.subtitle}</div>
            <div className="text-lg font-semibold">{s.title}</div>
            <div className="mt-2 text-2xl  font-[var(--font-hand)]">
              {s.value}
            </div>
          </div>
        ))}

        <div className="col-span-1 rounded-xl border p-4 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-purple-100" />
        </div>

        <div className="col-span-1 rounded-xl border p-4 flex flex-col justify-center items-center">
          <div className="text-sm text-gray-500">Kurslarga chegirma</div>
          <div className="text-5xl font-bold text-yellow-500">10%</div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="bg-white rounded-2xl border p-6">
        <div className="mb-4">
          <input
            placeholder="+998"
            className="w-full rounded-xl border px-4 py-3 focus:outline-none"
          />
        </div>

        <div className="space-y-3">
          {plans.map((p) => (
            <label
              key={p.id}
              className="flex items-center justify-between rounded-xl border px-4 py-3 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  checked={selected.id === p.id}
                  onChange={() => setSelected(p)}
                />
                <span className="font-medium">{p.label}</span>
              </div>
              <div className="text-right">
                {p.oldPrice && (
                  <div className="text-sm text-red-500 line-through">
                    {p.oldPrice.toLocaleString()} so'm
                  </div>
                )}
                <div className="font-semibold">
                  {p.price.toLocaleString()} so'm
                </div>
              </div>
            </label>
          ))}
        </div>

        <div className="flex items-center gap-4 my-6">
          <button className="border rounded-xl px-6 py-2 font-medium">
            <Image name="paynet" />
          </button>
          <button className="border rounded-xl px-6 py-2 font-medium">
            <Image name="paynet" />
          </button>
          <button className="border rounded-xl px-6 py-2 font-medium">
            <Image name="click" />
          </button>
        </div>

        <button className="w-full rounded-xl py-4 text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-600">
          To'lov qilish: {selected.price.toLocaleString()} so'm
        </button>
      </div>
    </div>
  );
}
