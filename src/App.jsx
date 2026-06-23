import { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SearchOverlay from './components/SearchOverlay';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/Login';
import CategoryPage from './pages/CategoryPage';
import ArticlePage from './pages/ArticlePage';

function AppContent() {
  const { currentPage, darkMode } = useApp();

  // Apply dark mode class to HTML element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
        <Header />
        <SearchOverlay />
        <main className="flex-1 page-enter">
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'login' && <LoginPage />}
          {currentPage === 'category' && <CategoryPage />}
          {currentPage === 'article' && <ArticlePage />}
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
