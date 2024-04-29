import React, { useState, useEffect } from "react";
import i18n from "i18next";

export const Changelang = ({ color = "black" }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  const changeLanguage =  (lng) => {
    localStorage.setItem("language", lng);
    setLanguage(lng);
  };

  
  useEffect(() => {
    const changeI18nLanguage = async () => {
      await i18n.changeLanguage(language);
      document.documentElement.setAttribute(
        "dir",
        language === "ar" ? "rtl" : "ltr"
      );
    };

    changeI18nLanguage();
  }, [language]);

  return (
    <>
      {language === "en" ? (
        <div className="absolute top-0 right-0 p-4 ">
          <button
            style={{ color, fontWeight: "bold", margin: 5 }}
            onClick={() => changeLanguage("ar")}
          >
            عربي
          </button>
        </div>
      ) : (
        <div className="absolute top-0 left-0 p-4 ">
          <button
            style={{ color, fontWeight: "bold", margin: 5 }}
            onClick={() => changeLanguage("en")}
          >
            English
          </button>
        </div>
      )}
    </>
  );
};
