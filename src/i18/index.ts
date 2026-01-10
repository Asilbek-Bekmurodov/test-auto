import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import uz from "./locales/uz.json";
import ru from "./locales/ru.json";
import kaa from "./locales/kaa.json";
import krill from "./locales/krill.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: "ru", // DEFAULT TIL
    fallbackLng: "ru",
    supportedLngs: ["ru", "uz", 'kaa', 'krill'], // 👈 MUHIM (faqat shu tillar)
    detection: {
      order: ["localStorage"],
      caches: ["localStorage"],
    },
    resources: {
      uz: { translation: uz },
      ru: { translation: ru },
      kaa: { translation: kaa },
      krill: { translation: krill },
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false, // 👈 re-render muammolarini oldini oladi
    },
  });

export default i18n;
