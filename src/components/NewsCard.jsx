import { Clock, Tag } from 'lucide-react';
import { categoryColors } from '../data/newsData';
import { categoryTranslationKeys } from '../utils/translations';
import { useApp } from '../context/AppContext';

function SkeletonCard({ variant = 'default' }) {
  if (variant === 'compact') {
    return (
      <div className="flex gap-3 animate-pulse">
        <div className="w-20 h-16 rounded-lg bg-gray-200 dark:bg-slate-700 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-1/3" />
          <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full" />
          <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-4/5" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-gray-100 dark:border-slate-700 animate-pulse">
      <div className="aspect-[4/3] bg-gray-200 dark:bg-slate-700" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/4" />
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded w-full" />
          <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded w-5/6" />
        </div>
        <div className="space-y-1.5">
          <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full" />
          <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-4/5" />
        </div>
        <div className="flex items-center gap-2 pt-1">
          <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-slate-700" />
          <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-1/3" />
          <div className="ml-auto h-3 bg-gray-200 dark:bg-slate-700 rounded w-1/5" />
        </div>
      </div>
    </div>
  );
}

export function NewsCardSkeleton({ count = 6, variant = 'default' }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} variant={variant} />
      ))}
    </>
  );
}

export default function NewsCard({
  article,
  variant = 'default',
  loading = false
}) {
  const { setSelectedArticle, setCurrentPage, t } = useApp();

  if (loading) return <SkeletonCard variant={variant} />;

  const handleClick = () => {
    setSelectedArticle(article);
    setCurrentPage('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const catColor = categoryColors[article.category];

  if (variant === 'compact') {
    return (
      <button
        onClick={handleClick}
        className="flex gap-3 group w-full text-left hover:bg-gray-50 dark:hover:bg-slate-800/50 rounded-lg p-1.5 -mx-1.5 transition-colors"
      >
        <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100 dark:bg-slate-700">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${catColor}`}>
            {t(categoryTranslationKeys[article.category], article.category)}
          </span>
          <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1 line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {article.title}
          </h4>
          <div className="flex items-center gap-1 mt-1 text-xs text-gray-400 dark:text-slate-500">
            <Clock size={10} />
            <span>{article.readTime} {t('minRead')}</span>
          </div>
        </div>
      </button>
    );
  }

  if (variant === 'horizontal') {
    return (
      <button
        onClick={handleClick}
        className="flex gap-4 group w-full text-left bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-gray-100 dark:border-slate-700 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
      >
        <div className="w-32 shrink-0 overflow-hidden bg-gray-100 dark:bg-slate-700">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div className="flex-1 p-4 min-w-0">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${catColor}`}>
            {t(categoryTranslationKeys[article.category], article.category)}
          </span>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mt-1.5 line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {article.title}
          </h3>
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 dark:text-slate-400">
            <div className="flex items-center gap-1">
              <Clock size={11} />
              <span>{article.readTime} {t('minRead')}</span>
            </div>
            <span>{article.publishedAt}</span>
          </div>
        </div>
      </button>
    );
  }

  if (variant === 'featured') {
    return (
      <button
        onClick={handleClick}
        className="group w-full text-left bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-gray-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      >
        <div className="aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-slate-700 relative">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${catColor}`}>
              {t(categoryTranslationKeys[article.category], article.category)}
            </span>
            {article.isFeatured && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-orange-500 text-white">
                {t('featured')}
              </span>
            )}
          </div>
        </div>

        <div className="p-5">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {article.title}
          </h2>
          <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-7 h-7 rounded-full object-cover border-2 border-gray-100 dark:border-slate-600"
              />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {article.author.name}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-slate-500">
              <Clock size={12} />
              <span>{article.readTime} {t('minRead')}</span>
            </div>
          </div>
        </div>
      </button>
    );
  }

  // Default card
  return (
    <button
      onClick={handleClick}
      className="group w-full text-left bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-gray-100 dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-slate-700 relative">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {article.isPopular && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
            <Tag size={10} />
            {t('popular')}
          </div>
        )}
      </div>

      <div className="p-4">
        <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-2.5 ${catColor}`}>
          {t(categoryTranslationKeys[article.category], article.category)}
        </span>

        <h3 className="text-[1.05rem] font-bold text-slate-900 dark:text-white leading-snug mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
          {article.title}
        </h3>

        <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
              {article.author.name}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-slate-500">
            <Clock size={11} />
            <span>{article.readTime} {t('minRead')}</span>
          </div>
        </div>
      </div>
    </button>
  );
}