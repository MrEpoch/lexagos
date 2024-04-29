"use client";
import { createContext, useContext, useEffect, useState } from "react";

const LangContext = createContext({
  isEnglish: true,
  toggleLangHandler: () => {},
});

export const useLang = () => {
  const context = useContext(LangContext);
  if (context === undefined || context === null) {
    return {};
  }
  return context;
};

export default function LangContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isEnglish, setIsEnglish] = useState(true);
  useEffect(() => initialLangHandler());

  function isLocalStorageEmpty(): boolean {
    return !localStorage.getItem("isEnglish");
  }

  function initialLangHandler(): void {
    if (isLocalStorageEmpty()) {
      localStorage.setItem("isEnglish", `true`);
      setIsEnglish(true);
    } else {
      const isEnglishVal: boolean = JSON.parse(
        localStorage.getItem("isEnglish")!,
      );
      setIsEnglish(() => {
        return isEnglishVal;
      });
    }
  }

  function toggleLangHandler(): void {
    const isEnglish: boolean = JSON.parse(localStorage.getItem("isEnglish")!);
    setIsEnglish(!isEnglish);
    setValueToLocalStorage();
  }

  function setValueToLocalStorage(): void {
    localStorage.setItem("isEnglish", `${!isEnglish}`);
  }

  return (
    <LangContext.Provider value={{ isEnglish, toggleLangHandler }}>
      {children}
    </LangContext.Provider>
  );
}
