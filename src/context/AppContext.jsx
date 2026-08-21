import { createContext, useContext, useState, useEffect } from 'react';
import { getTranslation } from '../utils/translations';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      localStorage.setItem('darkMode', String(!prev));
      return !prev;
    });
  };

  const changeLanguage = (nextLanguage) => {
    localStorage.setItem('language', nextLanguage);
    setLanguage(nextLanguage);
  };

  const t = (key, fallback) => getTranslation(language, key, fallback);

  return (
    <AppContext.Provider value={{
      darkMode, toggleDarkMode,
      currentPage, setCurrentPage,
      selectedCategory, setSelectedCategory,
      selectedArticle, setSelectedArticle,
      mobileMenuOpen, setMobileMenuOpen,
      searchQuery, setSearchQuery,
      language, changeLanguage,
      t,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() { // eslint-disable-line react-refresh/only-export-components
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}