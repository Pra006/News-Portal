import { useState } from 'react';
import { TrendingUp, Mail, CheckCircle, ChevronRight, Flame } from 'lucide-react';
import { useApp } from '../context/AppContext';
import NewsCard from './NewsCard';
import { categoryTranslationKeys } from '../utils/translations';

export default function Sidebar() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setSelectedArticle, setCurrentPage, articles, t } = useApp();
  const trendingArticles = articles.filter((article) => article.isPopular).slice(0, 5);
  const newsArticles = articles;

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setSubscribed(true);
      setLoading(false);
    }, 1500);
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setCurrentPage('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside className="space-y-6">
      {/* Trending Now */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 dark:border-slate-700">
          <div className="w-7 h-7 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
            <TrendingUp size={15} className="text-orange-500" />
          </div>
          <h2 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wide">
            {t('trendingNow')}
          </h2>
        </div>

        <div className="divide-y divide-gray-50 dark:divide-slate-700/50">
          {trendingArticles.map((article, index) => (
            <button
              key={article.id}
              onClick={() => handleArticleClick(article)}
              className="w-full text-left flex items-start gap-4 px-5 py-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors group"
            >
              <span className="text-3xl font-black text-gray-100 dark:text-slate-700 leading-none shrink-0 group-hover:text-blue-100 dark:group-hover:text-blue-900/50 transition-colors">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold text-orange-500 uppercase tracking-wide block mb-1">
                  {t(categoryTranslationKeys[article.category], article.category)}
                </span>

                <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {article.title}
                </h4>

                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-gray-400 dark:text-slate-500">
                  <span>{article.readTime} {t('minRead')}</span>
                  <span>·</span>
                  <span>{article.publishedAt}</span>
                </div>
              </div>

              <ChevronRight
                size={14}
                className="text-gray-300 dark:text-slate-600 shrink-0 mt-1 group-hover:text-blue-400 transition-colors"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 rounded-xl p-5 text-white">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <Mail size={15} className="text-white" />
          </div>
          <h3 className="font-bold text-base">{t('dailyBriefing')}</h3>
        </div>

        <p className="text-blue-100 text-sm leading-relaxed mb-4">
          {t('briefingDescription')}
        </p>

        {subscribed ? (
          <div className="flex items-center gap-2 bg-white/10 rounded-xl p-4">
            <CheckCircle size={20} className="text-green-300" />
            <div>
              <p className="font-semibold text-sm">{t('subscribed')}</p>
              <p className="text-blue-200 text-xs">{t('checkInbox')}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full bg-white/15 border border-white/30 rounded-lg px-4 py-2.5 text-sm text-white placeholder-blue-200 outline-none focus:ring-2 focus:ring-white/50 transition-all"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-70 text-white font-semibold py-2.5 px-4 rounded-lg transition-all hover:shadow-lg active:scale-95 text-sm min-h-[42px] flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {t('subscribe')}
                  <ChevronRight size={14} />
                </>
              )}
            </button>
          </form>
        )}

        <p className="text-blue-200 text-xs mt-3 text-center">
          {t('joinReaders')}
        </p>
      </div>

      {/* Hot Topics */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 dark:border-slate-700">
          <div className="w-7 h-7 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
            <Flame size={15} className="text-red-500" />
          </div>
          <h2 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wide">
            {t('hotTopics')}
          </h2>
        </div>

        <div className="p-4 flex flex-wrap gap-2">
          {[
            'Climate Summit',
            'AI 2026',
            'Election 2026',
            'Mars Mission',
            'EV Revolution',
            'Quantum Leap',
            'FIFA World Cup',
            'Fed Rates',
            'Digital Privacy',
            'Tech Regulation'
          ].map(tag => (
            <button
              key={tag}
              className="bg-gray-100 dark:bg-slate-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-gray-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-300 text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
            >
              #{tag.replace(/ /g, '')}
            </button>
          ))}
        </div>
      </div>

      {/* Must Read */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 dark:border-slate-700">
          <h2 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wide">
            {t('mustRead')}
          </h2>
        </div>

        <div className="p-4 space-y-3">
          {newsArticles.slice(6, 9).map(article => (
            <NewsCard key={article.id} article={article} variant="compact" />
          ))}
        </div>
      </div>

      {/* Ad Placeholder */}
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-700 rounded-xl border border-dashed border-gray-300 dark:border-slate-600 p-6 text-center">
        <p className="text-xs text-gray-400 dark:text-slate-500 uppercase tracking-wider font-medium">
          {t('advertisement')}
        </p>
        <div className="mt-3 w-full h-40 bg-gray-200/50 dark:bg-slate-700/50 rounded-lg flex items-center justify-center">
          <span className="text-gray-300 dark:text-slate-600 text-sm">
            300 × 250
          </span>
        </div>
      </div>
    </aside>
  );
}