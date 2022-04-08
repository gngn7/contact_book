import { createContext, useState } from "react";

type Theme = {
  primary: string;
  secondary: string;
};

export const themeContext = createContext<Theme>({
  primary: "red",
  secondary: "blue",
});

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

export const ThemeContextProvider = ({
  children,
}: ThemeContextProviderProps) => {
  const [theme, setTheme] = useState({
    primary: "red",
    secondary: "blue",
  });

  return (
    <themeContext.Provider value={theme}>{children}</themeContext.Provider>
  );
};
