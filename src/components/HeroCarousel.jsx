import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Clock, Zap } from "lucide-react";
import { useApp } from "../context/AppContext";
import { categoryTranslationKeys } from "../utils/translations";

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("right");

  const { articles, setSelectedArticle, setCurrentPage, t } = useApp();
  const heroArticles = articles.filter((article) => article.isBreaking).slice(0, 3);

  if (heroArticles.length === 0) return null;

  const goTo = useCallback(
    (index, dir = "right") => {
      if (isAnimating) return;

      setIsAnimating(true);
      setDirection(dir);

      setTimeout(() => {
        setCurrent(index);
        setIsAnimating(false);
      }, 300);
    },
    [isAnimating]
  );

  const next = useCallback(() => {
    goTo((current + 1) % heroArticles.length, "right");
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo(
      (current - 1 + heroArticles.length) % heroArticles.length,
      "left"
    );
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 6000);

    return () => clearInterval(timer);
  }, [next]);

  const article = heroArticles[current];

  const handleReadMore = () => {
    setSelectedArticle(article);
    setCurrentPage("article");
  };

  const categoryColors = {
    World: "from-blue-900/80 to-blue-600/40",
    Tech: "from-purple-900/80 to-purple-600/40",
    Politics: "from-slate-900/80 to-red-900/40",
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-slate-900 group"
      style={{
        aspectRatio: "16/7",
        minHeight: "320px",
        maxHeight: "580px",
      }}
    >
      {/* Background Image */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isAnimating ? "opacity-0" : "opacity-100"
        }`}
        style={{
          backgroundImage: `url(${article.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

      <div
        className={`absolute inset-0 bg-gradient-to-r ${
          categoryColors[article.category] ||
          "from-slate-900/80 to-transparent"
        } opacity-60`}
      />

      {/* Content */}
      <div
        className={`absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-14 transition-all duration-300 ${
          isAnimating
            ? direction === "right"
              ? "-translate-x-8 opacity-0"
              : "translate-x-8 opacity-0"
            : "translate-x-0 opacity-100"
        }`}
      >
        <div className="max-w-3xl">
          {/* Breaking Badge */}
          {article.isBreaking && (
            <div className="flex items-center gap-2 mb-4">
              <span className="flex items-center gap-1.5 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider animate-pulse">
                <Zap size={12} />
                {t('breakingNews')}
              </span>

              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                {t(categoryTranslationKeys[article.category], article.category)}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-white leading-tight mb-3 md:mb-4 drop-shadow-lg max-w-2xl">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-4 md:mb-6 max-w-xl line-clamp-2 md:line-clamp-3 hidden sm:block">
            {article.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 mb-4 md:mb-6">
            <div className="flex items-center gap-2">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-7 h-7 rounded-full border-2 border-white/50 object-cover"
              />

              <span className="text-gray-200 text-sm font-medium">
                {article.author.name}
              </span>
            </div>

            <span className="text-gray-400 hidden sm:block">·</span>

            <div className="hidden sm:flex items-center gap-1.5 text-gray-300 text-sm">
              <Clock size={14} />
              {article.readTime} min read
            </div>

            <span className="text-gray-400 hidden sm:block">·</span>

            <span className="text-gray-300 text-sm hidden sm:block">
              {article.publishedAt}
            </span>
          </div>

          {/* CTA */}
          <button
            onClick={handleReadMore}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition-all hover:shadow-lg hover:shadow-blue-500/25 active:scale-95 text-sm md:text-base min-h-[48px]"
          >
            {t('readFullStory')}
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110 border border-white/20"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110 border border-white/20"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 right-6 md:right-14 flex items-center gap-2">
        {heroArticles.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? "right" : "left")}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-8 h-2.5 bg-white"
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20">
        <div
          key={current}
          className="h-full bg-blue-500 animate-progress-bar"
          style={{ animationDuration: "6s" }}
        />
      </div>
    </section>
  );
}