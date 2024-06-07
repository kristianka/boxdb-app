import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import EnTranslation from "./en/translations.json";
import FiTranslation from "./fi/translations.json";

// Get the saved language from localStorage or default to "en"
const savedLanguage = localStorage.getItem("i18nextLng") || "en";

i18next.use(initReactI18next).init({
  lng: savedLanguage,
  debug: true,
  resources: {
    en: {
      translation: EnTranslation,
    },
    fi: {
      translation: FiTranslation,
    },
  },
});
