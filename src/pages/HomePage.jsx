import { useState, useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import HeroCarousel from "../components/HeroCarousel";
import NewsCard, { NewsCardSkeleton } from "../components/NewsCard";
import Sidebar from "../components/Sidebar";
import { newsArticles, heroArticles } from "../data/newsData";
import { useApp } from "../context/AppContext";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const { setSelectedArticle, setCurrentPage } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const featuredArticle =
    newsArticles.find((a) => a.isFeatured) || newsArticles[3];

  const latestArticles = newsArticles.slice(0, 6);
  const popularArticles = newsArticles.filter((a) => a.isPopular).slice(0, 3);
  const moreArticles = newsArticles.slice(6, 12);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Main Container */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Breaking News Strip */}
        <div className="flex items-center gap-3 bg-white dark:bg-slate-800 rounded-xl px-5 py-3 mb-8 border border-gray-100 dark:border-slate-700 shadow-sm overflow-hidden">
          <span className="shrink-0 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
            LIVE
          </span>

          <div className="flex-1 overflow-hidden">
            <div className="flex gap-6 text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap animate-marquee">
              {heroArticles.map((a) => (
                <button
                  key={a.id}
                  onClick={() => {
                    setSelectedArticle(a);
                    setCurrentPage("article");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium shrink-0"
                >
                  {a.title}
                </button>
              ))}

              <span className="shrink-0 text-gray-300 dark:text-slate-600">
                •
              </span>

              {heroArticles.map((a) => (
                <button
                  key={`${a.id}-2`}
                  onClick={() => {
                    setSelectedArticle(a);
                    setCurrentPage("article");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium shrink-0"
                >
                  {a.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Grid + Sidebar */}
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Top Story */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-blue-600 rounded-full" />
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                    Top Story
                  </h2>
                </div>
              </div>

              {loading ? (
                <div className="bg-white dark:bg-slate-800 rounded-xl aspect-[16/9] animate-pulse bg-gray-200 dark:bg-slate-700" />
              ) : (
                <NewsCard article={featuredArticle} variant="featured" />
              )}
            </section>

            {/* Latest News Grid */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-blue-600 rounded-full" />
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                    Latest News
                  </h2>
                </div>

                <button className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                  See all <ArrowRight size={14} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {loading ? (
                  <NewsCardSkeleton count={6} />
                ) : (
                  latestArticles.map((article) => (
                    <NewsCard key={article.id} article={article} />
                  ))
                )}
              </div>
            </section>

            {/* Popular Section */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-orange-500 rounded-full" />
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
                    <Sparkles size={16} className="text-orange-500" />
                    Most Popular
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {loading ? (
                  <NewsCardSkeleton count={3} />
                ) : (
                  popularArticles.map((article) => (
                    <NewsCard key={article.id} article={article} />
                  ))
                )}
              </div>
            </section>

            {/* Category Strips */}
            {[
              {
                label: "Technology",
                color: "bg-purple-600",
                articles: newsArticles.filter((a) => a.category === "Tech"),
              },
              {
                label: "World Affairs",
                color: "bg-blue-600",
                articles: newsArticles.filter(
                  (a) => a.category === "World" || a.category === "Politics"
                ),
              },
            ].map(
              ({ label, color, articles }) =>
                articles.length > 0 && (
                  <section key={label} className="mb-10">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2">
                        <div className={`w-1 h-6 ${color} rounded-full`} />
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                          {label}
                        </h2>
                      </div>

                      <button className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors">
                        View more <ArrowRight size={14} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {articles.slice(0, 2).map((article) => (
                        <NewsCard key={article.id} article={article} />
                      ))}
                    </div>
                  </section>
                )
            )}

            {/* More Stories */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-slate-400 rounded-full" />
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                    More Stories
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {loading ? (
                  <NewsCardSkeleton count={6} />
                ) : (
                  moreArticles.map((article) => (
                    <NewsCard key={article.id} article={article} />
                  ))
                )}
              </div>
            </section>
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