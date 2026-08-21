import { useEffect, useRef } from 'react';
import { Search, X, Clock, ArrowRight } from 'lucide-react';
import { newsArticles, heroArticles, categoryColors } from '../data/newsData';
import { useApp } from '../context/AppContext';
import { categoryTranslationKeys } from '../utils/translations';

export default function SearchOverlay() {
  const { searchQuery, setSearchQuery, setSelectedArticle, setCurrentPage, t } = useApp();
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchQuery) {
      inputRef.current?.focus();
    }
  }, [searchQuery]);

  if (!searchQuery) return null;

  const allArticles = [...heroArticles, ...newsArticles];
  const q = searchQuery.toLowerCase();

  const results = allArticles
    .filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q))
    )
    .slice(0, 8);

  const handleSelect = (article) => {
    setSelectedArticle(article);
    setCurrentPage('article');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center pt-24 px-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setSearchQuery('')}
      />

      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">

        {/* Search Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 dark:border-slate-700">
          <Search size={18} className="text-blue-500 shrink-0" />

          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t('searchStories')}
            className="flex-1 text-base text-slate-900 dark:text-white placeholder-gray-400 outline-none bg-transparent"
            autoFocus
          />

          <button
            onClick={() => setSearchQuery('')}
            className="w-7 h-7 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-500 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <div className="divide-y divide-gray-50 dark:divide-slate-700/50 max-h-[60vh] overflow-y-auto">

            <div className="px-5 py-2.5 flex items-center justify-between">
              <span className="text-xs text-gray-400 dark:text-slate-500 font-medium uppercase tracking-wide">
                {results.length} {results.length !== 1 ? t('results') : t('result')} for "{searchQuery}"
              </span>
            </div>

            {results.map(article => {
              const catColor = categoryColors[article.category];

              return (
                <button
                  key={article.id}
                  onClick={() => handleSelect(article)}
                  className="w-full text-left flex items-start gap-4 px-5 py-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors group"
                >
                  <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-700 shrink-0">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${catColor}`}>
                      {t(categoryTranslationKeys[article.category], article.category)}
                    </span>

                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {article.title}
                    </h4>

                    <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-400 dark:text-slate-500">
                      <Clock size={10} />
                      <span>{article.readTime} {t('minRead')}</span>
                      <span>·</span>
                      <span>{article.publishedAt}</span>
                    </div>
                  </div>

                  <ArrowRight size={14} className="text-gray-300 dark:text-slate-600 shrink-0 mt-2 group-hover:text-blue-400 transition-colors" />
                </button>
              );
            })}
          </div>
        ) : (
          <div className="px-5 py-10 text-center">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-slate-900 dark:text-white font-semibold">{t('noResults')}</p>
            <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">
              {t('trySearching')}
            </p>
          </div>
        )}

        {/* Suggestions */}
        {searchQuery.length < 2 && (
          <div className="px-5 py-4 border-t border-gray-100 dark:border-slate-700">
            <p className="text-xs text-gray-400 dark:text-slate-500 mb-2 font-medium uppercase tracking-wide">
              {t('popularSearches')}
            </p>

            <div className="flex gap-2 flex-wrap">
              {['Climate Summit', 'AI Technology', 'Champions League', 'Federal Reserve', 'Mars Mission'].map(s => (
                <button
                  key={s}
                  onClick={() => setSearchQuery(s)}
                  className="bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-400 text-xs px-3 py-1.5 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}