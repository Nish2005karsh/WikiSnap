
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
  highContrast: false,
  toggleHighContrast: () => {},
  fontSize: 1,
  increaseFontSize: () => {},
  decreaseFontSize: () => {},
  resetFontSize: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("dark");
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(1);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const savedContrast = localStorage.getItem("highContrast");
    const savedFontSize = localStorage.getItem("fontSize");
    
    if (savedTheme) setTheme(savedTheme);
    if (savedContrast) setHighContrast(savedContrast === "true");
    if (savedFontSize) setFontSize(parseFloat(savedFontSize));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("high-contrast", highContrast);
    document.documentElement.style.setProperty("--font-size-multiplier", fontSize.toString());
    
    localStorage.setItem("theme", theme);
    localStorage.setItem("highContrast", highContrast.toString());
    localStorage.setItem("fontSize", fontSize.toString());
  }, [theme, highContrast, fontSize]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === "dark" ? "light" : "dark"));
  };

  const toggleHighContrast = () => {
    setHighContrast(prev => !prev);
  };

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 0.1, 1.5));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 0.1, 0.8));
  };

  const resetFontSize = () => {
    setFontSize(1);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme, 
      highContrast, 
      toggleHighContrast,
      fontSize,
      increaseFontSize,
      decreaseFontSize,
      resetFontSize
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
