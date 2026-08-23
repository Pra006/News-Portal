import { createContext, useContext, useState, useEffect } from 'react';
import { getTranslation } from '../utils/translations';
import { heroArticles, newsArticles } from '../data/newsData';

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
  const [articles, setArticles] = useState(() => {
    const saved = localStorage.getItem('managedArticles');
    return saved ? JSON.parse(saved) : [...heroArticles, ...newsArticles];
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

  const saveArticles = (nextArticles) => {
    setArticles(nextArticles);
    localStorage.setItem('managedArticles', JSON.stringify(nextArticles));
  };

  const addArticle = (article) => {
    saveArticles([{ ...article, id: `article-${Date.now()}` }, ...articles]);
  };

  const updateArticle = (updatedArticle) => {
    saveArticles(articles.map((article) => (
      article.id === updatedArticle.id ? updatedArticle : article
    )));
  };

  const deleteArticle = (articleId) => {
    saveArticles(articles.filter((article) => article.id !== articleId));
  };

  return (
    <AppContext.Provider value={{
      darkMode, toggleDarkMode,
      currentPage, setCurrentPage,
      selectedCategory, setSelectedCategory,
      selectedArticle, setSelectedArticle,
      mobileMenuOpen, setMobileMenuOpen,
      searchQuery, setSearchQuery,
      language, changeLanguage,
      articles,
      addArticle, updateArticle, deleteArticle,
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