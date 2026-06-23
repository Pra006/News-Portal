import { createContext, useContext, useState, useEffect } from 'react';

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

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      localStorage.setItem('darkMode', String(!prev));
      return !prev;
    });
  };

  return (
    <AppContext.Provider value={{
      darkMode, toggleDarkMode,
      currentPage, setCurrentPage,
      selectedCategory, setSelectedCategory,
      selectedArticle, setSelectedArticle,
      mobileMenuOpen, setMobileMenuOpen,
      searchQuery, setSearchQuery,
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