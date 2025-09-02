import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    } else {
      // Default to dark mode
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
    
    // Save to localStorage
    localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme = {
    isDark,
    isLight: !isDark,
    toggleTheme,
    colors: {
      // Dark mode colors
      dark: {
        primary: "#000000",
        secondary: "#1a1a1a", 
        accent: "#2a2a2a",
        text: "#ffffff",
        textSecondary: "#b0b0b0",
        border: "rgba(255, 255, 255, 0.1)",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      },
      // Light mode colors
      light: {
        primary: "#ffffff",
        secondary: "#f8f9fa",
        accent: "#e9ecef", 
        text: "#212529",
        textSecondary: "#6c757d",
        border: "rgba(0, 0, 0, 0.1)",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      }
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
