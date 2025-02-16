import apiClient from "@/services/apiClient";
import { useTranslation } from "next-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = async (lng: string) => {
    try {
      await i18n.changeLanguage(lng);

      await apiClient.post("/set_language/", {
        language_code: lng,
      });

      document.documentElement.dir = lng === "fa" ? "rtl" : "ltr";
      document.documentElement.lang = lng;
    } catch (error) {
      console.error("Language change failed:", error);
    }
  };

  return (
    <div>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("fa")}>فارسی</button>
    </div>
  );
};

export default LanguageSwitcher;
