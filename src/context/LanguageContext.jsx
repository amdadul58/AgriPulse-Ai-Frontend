import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const LanguageContext = createContext(null);

const SUPPORTED_LANGUAGES = ["English", "Bangla"];

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    const savedLanguage = localStorage.getItem("language");

    return SUPPORTED_LANGUAGES.includes(savedLanguage)
      ? savedLanguage
      : "English";
  });

  // =====================================================
  // Keep localStorage synchronized
  // =====================================================
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // =====================================================
  // Listen for language changes
  // =====================================================
  useEffect(() => {
    const handleLanguageChange = () => {
      const savedLanguage =
        localStorage.getItem("language");

      if (
        savedLanguage &&
        SUPPORTED_LANGUAGES.includes(savedLanguage)
      ) {
        setLanguageState(savedLanguage);
      }
    };

    window.addEventListener(
      "languageChanged",
      handleLanguageChange
    );

    window.addEventListener(
      "storage",
      handleLanguageChange
    );

    return () => {
      window.removeEventListener(
        "languageChanged",
        handleLanguageChange
      );

      window.removeEventListener(
        "storage",
        handleLanguageChange
      );
    };
  }, []);

  // =====================================================
  // Change Language
  // =====================================================
  const changeLanguage = (newLanguage) => {
    if (
      !SUPPORTED_LANGUAGES.includes(newLanguage)
    ) {
      return;
    }

    setLanguageState(newLanguage);

    localStorage.setItem(
      "language",
      newLanguage
    );

    // Notify all dashboard components
    window.dispatchEvent(
      new Event("languageChanged")
    );
  };

  // =====================================================
  // Helper
  // =====================================================
  const isBangla = language === "Bangla";

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: changeLanguage,
        changeLanguage,
        isBangla,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// =====================================================
// Custom Hook
// =====================================================
export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
};