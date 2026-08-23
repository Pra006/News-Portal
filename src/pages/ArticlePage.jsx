import { useState } from "react";
import {
  ChevronLeft,
  Clock,
  Calendar,
  Link2,
  Bookmark,
  Heart,
  MessageCircle,
  ChevronRight,
  Eye,
} from "lucide-react";
import { newsArticles as seedArticles, categoryColors } from "../data/newsData";
import NewsCard from "../components/NewsCard";
import { useApp } from "../context/AppContext";

export default function ArticlePage() {
  const {
    selectedArticle,
    setCurrentPage,
    setSelectedArticle,
    setSelectedCategory,
    articles,
    t,
  } = useApp();

  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount] = useState(247);
  const [copied, setCopied] = useState(false);

  if (!selectedArticle) return null;

  const article = selectedArticle;
  const catColor = categoryColors[article.category];

  const relatedArticles = articles
    .filter(
      (a) =>
        a.category === article.category && a.id !== article.id
    )
    .slice(0, 4);

  const otherArticles = articles
    .filter((a) => a.id !== article.id)
    .slice(0, 2);

  const displayRelated =
    relatedArticles.length >= 2
      ? relatedArticles.slice(0, 4)
      : otherArticles;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const paragraphs = article.content
    .split("\n\n")
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Back Navigation */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <button
          onClick={() => {
            setCurrentPage("home");
            setSelectedArticle(null);
          }}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
        >
          <ChevronLeft
            size={16}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          {t('backToHome')}
        </button>
      </div>

      {/* Article Header */}
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        {/* Category & Badges */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <button
            onClick={() => {
              setSelectedCategory(article.category);
              setCurrentPage("category");
            }}
            className={`text-xs font-bold px-3 py-1.5 rounded-full transition-opacity hover:opacity-80 ${catColor}`}
          >
            {article.category}
          </button>

          {article.isBreaking && (
            <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full animate-pulse">
              {t('breakingShort')}
            </span>
          )}

          {article.isFeatured && (
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold px-3 py-1.5 rounded-full">
              {t('featured')}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6">
          {article.title}
        </h1>

        {/* Excerpt */}
        <p className="text-lg text-gray-600 dark:text-slate-400 leading-relaxed mb-6 font-light border-l-4 border-blue-500 pl-4">
          {article.excerpt}
        </p>

        {/* Byline */}
        <div className="flex items-center justify-between gap-4 py-4 border-t border-b border-gray-100 dark:border-slate-700 flex-wrap">
          <div className="flex items-center gap-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-11 h-11 rounded-full object-cover border-2 border-blue-100 dark:border-blue-900/50"
            />

            <div>
              <p className="font-bold text-slate-900 dark:text-white text-sm">
                {article.author.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                {article.author.role}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-slate-400 flex-wrap">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} />
              <span>{article.publishedAt}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Clock size={14} />
              <span>{article.readTime} min read</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Eye size={14} />
              <span>24.7K {t('views')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100 dark:bg-slate-800 shadow-xl">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        <p className="text-xs text-gray-400 dark:text-slate-500 mt-2 px-1">
          {t('photo')} {article.author.name} / PulseWire Media
        </p>
      </div>

      {/* Article Body */}
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {paragraphs.map((para, i) => {
            if (i === 3) {
              return (
                <div key={i}>
                  <p className="text-slate-700 dark:text-slate-300 text-base md:text-lg leading-[1.8] mb-6">
                    {para}
                  </p>

                  <div className="my-8 aspect-[16/9] rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-800">
                    <img
                      src={articles[2]?.image || seedArticles[2].image}
                      alt="Inline illustration"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <p className="text-xs text-gray-400 dark:text-slate-500 -mt-4 mb-6 px-1">
                    Related imagery from our archives
                  </p>
                </div>
              );
            }

            if (i === 5) {
              return (
                <div key={i}>
                  <blockquote className="my-8 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 px-6 py-5 rounded-r-xl">
                    <p className="text-blue-900 dark:text-blue-100 text-xl font-semibold italic leading-relaxed">
                      "This is not just an incremental change — it
                      represents a paradigm shift in how we think
                      about this entire domain."
                    </p>

                    <cite className="text-blue-600 dark:text-blue-400 text-sm font-medium mt-2 block not-italic">
                      — Dr. Elena Vasquez, Global Policy Institute
                    </cite>
                  </blockquote>
                </div>
              );
            }

            return (
              <p
                key={i}
                className="text-slate-700 dark:text-slate-300 text-base md:text-lg leading-[1.8] mb-6"
              >
                {para}
              </p>
            );
          })}
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2 mt-8 flex-wrap">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            {t('tags')}
          </span>

          {article.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Share & Reaction Bar */}
        <div className="border-t border-b border-gray-100 dark:border-slate-700 py-5 my-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Reactions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLiked((l) => !l)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all min-h-[44px] text-sm font-semibold ${
                  liked
                    ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
                    : "border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 hover:border-red-200 hover:text-red-500"
                }`}
              >
                <Heart
                  size={16}
                  className={liked ? "fill-red-500 text-red-500" : ""}
                />
                <span>{liked ? likeCount + 1 : likeCount}</span>
              </button>

              <button className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 hover:border-blue-200 hover:text-blue-500 transition-all min-h-[44px] text-sm font-semibold">
                <MessageCircle size={16} />
                <span>47</span>
              </button>

              <button
                onClick={() => setBookmarked((b) => !b)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all min-h-[44px] text-sm font-semibold ${
                  bookmarked
                    ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400"
                    : "border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 hover:border-blue-200 hover:text-blue-500"
                }`}
              >
                <Bookmark
                  size={16}
                  className={
                    bookmarked ? "fill-blue-500 text-blue-500" : ""
                  }
                />
                <span>{bookmarked ? t('saved') : t('save')}</span>
              </button>
            </div>

            {/* Share */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-slate-400 font-medium hidden sm:block">
                {t('share')}:
              </span>

              <button className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:opacity-80 transition-opacity hover:scale-110">
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>

              <button className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-80 transition-opacity hover:scale-110">
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="currentColor"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>

              <button className="w-9 h-9 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-80 transition-opacity hover:scale-110">
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z" />
                </svg>
              </button>

              <button
                onClick={handleCopyLink}
                className={`w-9 h-9 rounded-full flex items-center justify-center hover:scale-110 transition-all ${
                  copied
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 hover:bg-gray-200"
                }`}
              >
                <Link2 size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Author Card */}
        <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 mb-10 flex gap-4 items-start">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-slate-600 shrink-0"
          />

          <div>
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-bold text-slate-900 dark:text-white">
                {article.author.name}
              </h4>

              <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full font-medium">
                {article.author.role}
              </span>
            </div>

            <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">
              Award-winning journalist with over a decade covering{" "}
              {article.category.toLowerCase()} news. Their work has been
              featured in leading publications worldwide, bringing
              clarity to complex global stories.
            </p>

            <button className="mt-3 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1">
              More by {article.author.name.split(" ")[0]}{" "}
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      <div className="bg-gray-50 dark:bg-slate-950 py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-600 rounded-full" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {t('relatedStories')}
              </h2>
            </div>

            <button
              onClick={() => {
                setSelectedCategory(article.category);
                setCurrentPage("category");
              }}
              className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors"
            >
              {t('moreIn')} {article.category} <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {displayRelated.map((a) => (
              <NewsCard key={a.id} article={a} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-12">
        <div className="max-w-[600px] mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">
            {t('stayInformed')}
          </h3>

          <p className="text-blue-100 mb-6">
            {t('dailyStories')}
          </p>

          <div className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-white/15 border border-white/30 rounded-full px-5 py-3 text-sm text-white placeholder-blue-200 outline-none focus:ring-2 focus:ring-white/40"
            />

            <button className="bg-orange-500 hover:bg-orange-400 text-white font-semibold px-6 py-3 rounded-full transition-all hover:shadow-lg active:scale-95 whitespace-nowrap min-h-[48px]">
              {t('subscribe')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}