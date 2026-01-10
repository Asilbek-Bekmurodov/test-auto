import { useState } from "react";
import { plans, stats, type Plan } from "../../pages/Data";
import Image from "../Image/Image";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function Payment() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<Plan>(plans[0]);
  const { isDark } = useTheme();

  return (
    <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* LEFT */}
      <div className="bg-white rounded-2xl border border-[#2422207A] p-6 grid grid-cols-2 gap-4 dark:bg-[#050C1D] dark:text-white dark:border-[#3597F9]">
        {stats.map((s) => (
          <div
            key={s.title}
            className="rounded-xl border border-[#2422200A] p-4"
            style={
              isDark
                ? {
                    background:
                      "linear-gradient(283.19deg, #3597F9 0%, #462F8F 95.85%)",
                  }
                : {}
            }
          >
            <div className="text-sm text-gray-200">{t(s.subtitle)}</div>
            <div className="text-lg font-semibold">{t(s.title)}</div>
            <div className="mt-2 text-2xl text-right font-hand">{s.value}</div>
          </div>
        ))}

        <div
          className="relative overflow-hidden rounded-xl border border-[#2422200A] p-4"
          style={
            isDark
              ? {
                  background:
                    "linear-gradient(283.19deg, #3597F9 0%, #462F8F 95.85%)",
                }
              : {}
          }
        >
          <div className="text-sm text-gray-200">{t("payment.all")}</div>
          <div className="text-lg font-semibold">{t("payment.mistakes")}</div>
          <Image className="absolute -bottom-7 -right-5" name="paymentImg1" />
        </div>

        <div
          className="rounded-xl border border-[#2422200A] p-4"
          style={
            isDark
              ? {
                  background:
                    "linear-gradient(283.19deg, #3597F9 0%, #462F8F 95.85%)",
                }
              : {}
          }
        >
          <div className="text-sm text-gray-200">{t("payment.mistakes")}</div>
          <div className="text-lg font-semibold">{t("payment.all")}</div>
          <Image name="paymentImg2" />
        </div>
      </div>

      {/* RIGHT */}
      <div className="bg-white border-[#2422207A] rounded-2xl border p-6 dark:bg-[#050C1D] dark:text-white dark:border-[#3597F9]">
        <div className="mb-4">
          <input
            placeholder={t("payment.phone")}
            className="w-full rounded-xl border border-[#2422207A] px-4 py-3 focus:outline-none dark:border-[#3597F9]"
          />
        </div>

        <div className="space-y-3">
          {plans.map((p) => (
            <label
              key={p.id}
              className="flex items-center justify-between rounded-xl border border-[#2422207A] dark:border-[#3597F9] px-4 py-3 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  checked={selected.id === p.id}
                  onChange={() => setSelected(p)}
                />
                <span className="font-medium">{t(p.label)}</span>
              </div>

              <div className="text-right">
                {p.oldPrice && (
                  <div className="text-sm text-red-500 line-through">
                    {p.oldPrice.toLocaleString()} {t("payment.currency")}
                  </div>
                )}
                <div className="font-semibold">
                  {p.price.toLocaleString()} {t("payment.currency")}
                </div>
              </div>
            </label>
          ))}
        </div>

        <button className="w-full mt-6 rounded-xl py-4 text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-600">
          {t("payment.pay")} {selected.price.toLocaleString()}{" "}
          {t("payment.currency")}
        </button>
      </div>
    </div>
  );
}
