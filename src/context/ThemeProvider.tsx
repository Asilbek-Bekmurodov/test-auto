import { useEffect } from "react";
import useLocalStorage from "use-local-storage";
import { ThemeContext } from "./themeContext";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage<boolean>("isdark", preference);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
