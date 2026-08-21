import { useState, useEffect } from "react";
import { SlidersHorizontal, ArrowRight } from "lucide-react";
import NewsCard, { NewsCardSkeleton } from "../components/NewsCard";
import Sidebar from "../components/Sidebar";
import {
  newsArticles,
  heroArticles,
  categoryColors,
} from "../data/newsData";
import { useApp } from "../context/AppContext";
import { categoryTranslationKeys } from "../utils/translations";

const categoryEmojis = {
  World: "🌍",
  Politics: "🏛️",
  Tech: "💻",
  Sports: "⚽",
  Business: "📈",
  Science: "🔬",
  Health: "❤️",
  Culture: "🎨",
};

const categoryDescriptions = {
  World:
    "Coverage of international events, global diplomacy, and world affairs from our network of correspondents.",
  Politics:
    "In-depth reporting on government, elections, policy, and political analysis from top journalists.",
  Tech: "Breaking technology news, product launches, AI developments, and the future of innovation.",
  Sports:
    "Live scores, match reports, transfers, and expert analysis across all major sports.",
  Business:
    "Markets, economy, corporate news, and financial analysis for the informed investor.",
  Science:
    "Discoveries, research breakthroughs, space exploration, and the frontiers of human knowledge.",
  Health:
    "Medical research, public health news, wellness insights, and healthcare policy.",
  Culture:
    "Arts, entertainment, literature, and the cultural stories shaping our world.",
};

export default function CategoryPage() {
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("latest");
  const { selectedCategory, t } = useApp();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  if (!selectedCategory) return null;

  const allArticles = [...heroArticles, ...newsArticles];
  const filtered = allArticles.filter(
    (a) => a.category === selectedCategory
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "popular")
      return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);

    if (sortBy === "featured")
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);

    return 0;
  });

  const featuredInCat =
    filtered.find((a) => a.isFeatured || a.isBreaking) || null;

  const restArticles = sorted.filter(
    (a) => a.id !== featuredInCat?.id
  );

  const catColor = categoryColors[selectedCategory];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Category Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-orange-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">
              {categoryEmojis[selectedCategory]}
            </span>

            <span
              className={`text-xs font-bold px-3 py-1.5 rounded-full ${catColor}`}
            >
              {filtered.length} {t('stories')}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            {t(categoryTranslationKeys[selectedCategory], selectedCategory)}
          </h1>

          <p className="text-gray-300 text-base md:text-lg max-w-2xl leading-relaxed">
            {categoryDescriptions[selectedCategory]}
          </p>

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mt-6 text-sm text-gray-400">
            <span className="hover:text-white cursor-pointer transition-colors">
              {t('home')}
            </span>
            <span>/</span>
            <span className="text-white font-medium">
              {selectedCategory}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Filter Bar */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <p className="text-sm text-gray-500 dark:text-slate-400">
                {t('showing')} {" "}
                <strong className="text-slate-900 dark:text-white">
                  {filtered.length}
                </strong>{" "}
                {t('stories')} {t('in')} {t(categoryTranslationKeys[selectedCategory], selectedCategory)}
              </p>

              <div className="flex items-center gap-2">
                <SlidersHorizontal size={15} className="text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-slate-400">
                  {t('sortBy')}
                </span>

                <div className="flex bg-gray-100 dark:bg-slate-800 rounded-lg p-1 gap-1">
                  {["latest", "popular", "featured"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSortBy(opt)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all capitalize ${
                        sortBy === opt
                          ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                          : "text-gray-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Featured Article */}
            {featuredInCat && !loading && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-blue-600 rounded-full" />
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                    {t('featuredStory')}
                  </h2>
                </div>

                <NewsCard
                  article={featuredInCat}
                  variant="featured"
                />
              </div>
            )}

            {/* Articles Grid */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-orange-500 rounded-full" />
                <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                  {t('allStories')}
                </h2>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  <NewsCardSkeleton count={6} />
                </div>
              ) : restArticles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {restArticles.map((article) => (
                    <NewsCard
                      key={article.id}
                      article={article}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">
                    {categoryEmojis[selectedCategory]}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {t('noMoreStories')}
                  </h3>

                  <p className="text-gray-500 dark:text-slate-400">
                    {t('checkBack')} {t(categoryTranslationKeys[selectedCategory], selectedCategory)}
                  </p>
                </div>
              )}

              {/* Load More */}
              {restArticles.length >= 3 && (
                <div className="text-center mt-10">
                  <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-full transition-all hover:shadow-lg active:scale-95 min-h-[48px]">
                    {t('loadMoreStories')}
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full xl:w-80 shrink-0">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}