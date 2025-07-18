import { createContext, useEffect, useState } from "react";
import type { ThemeInterface } from "../utils/inrterface/themeInterface";

export const ThemeContext = createContext<ThemeInterface>({theme : 'dark' , toggle : ()=> {} });

const getFromLocalStorage = () => {
  const value = localStorage.getItem("theme")
    ? localStorage.getItem("theme")!
    : "light";
  return value;
};

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState(() => {
    return getFromLocalStorage();
  });

  const toggle = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
