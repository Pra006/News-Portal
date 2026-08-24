import { useState, useRef, useEffect } from "react";
import {
  Search,
  Moon,
  Sun,
  Menu,
  X,
  Zap,
  Bell,
  TrendingUp,
  Languages,
  ShieldCheck,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { categories } from "../data/newsData";
import { categoryTranslationKeys } from "../utils/translations";
import UserLogin from "./auth/Login";

const navCategories = [
  "World",
  "Politics",
  "Tech",
  "Sports",
  "Business",
  "Science",
];

export default function Header() {
  const {
    darkMode,
    toggleDarkMode,
    mobileMenuOpen,
    setMobileMenuOpen,
    currentPage,
    setCurrentPage,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    language,
    changeLanguage,
    t,
  } = useApp();

  const [searchOpen, setSearchOpen] = useState(false);

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage("category");
    setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    setCurrentPage("home");
    setSelectedCategory(null);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Breaking News Ticker */}
      <div className="bg-blue-600 dark:bg-blue-700 text-white text-xs sm:text-sm py-1.5 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-4 flex items-center gap-2 sm:gap-3">
          <span className="flex items-center gap-1 shrink-0 font-semibold bg-orange-500 rounded px-2 py-0.5 text-xs uppercase tracking-wide">
            <Zap size={10} />
            <span className="hidden xs:inline">{t("breaking")}</span>
            <span className="xs:hidden">{t("live")}</span>
          </span>
          <div className="overflow-hidden flex-1">
            <div className="animate-marquee whitespace-nowrap">
              Global Climate Summit reaches historic accord &nbsp;•&nbsp; AI
              breakthrough shakes Silicon Valley &nbsp;•&nbsp; Champions League
              Final: Drama in the 94th minute &nbsp;•&nbsp; Fed signals rate
              cuts ahead &nbsp;•&nbsp; Mars habitat test declared successful
              &nbsp;•&nbsp;
            </div>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-4">
          {/* ── Row 1: Logo · [tagline desktop] · Actions ── */}
          <div className="flex items-center h-14 sm:h-16 gap-2 sm:gap-4">
            {/* Logo */}
            <button
              onClick={handleLogoClick}
              className="flex items-center gap-2 shrink-0 group"
              aria-label="Go to homepage"
            >
              <span className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-black to-red-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                तराई टाइम्स
              </span>
            </button>

            {/* Tagline — desktop only in this row */}
            <div className="hidden sm:flex flex-1 flex-col items-center justify-center text-center gap-0.5">
              <span className="text-base md:text-xl lg:text-2xl font-bold text-slate-800 dark:text-white leading-tight">
                सबैको आवाज, आवाज एकसाथ
              </span>
            </div>

            {/* Spacer pushes actions right on mobile */}
            <div className="flex-1 sm:hidden" />

            {/* Action Buttons */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {/* Search toggle (mobile only) */}
              <button
                onClick={() => setSearchOpen((o) => !o)}
                className="sm:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
                aria-label="Toggle search"
              >
                <Search size={18} />
              </button>

              {/* Bell (desktop only) */}
              <button className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors relative">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full" />
              </button>

              {/* Dark mode */}
              <button
                onClick={toggleDarkMode}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun size={18} className="text-yellow-400" />
                ) : (
                  <Moon size={18} />
                )}
              </button>
              <div className="hidden lg:flex items-center gap-1 rounded-full bg-gray-100 dark:bg-slate-800 p-1">
                <button
                  onClick={() => changeLanguage("en")}
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${language === "en" ? "bg-white dark:bg-slate-700 text-blue-600 shadow-sm" : "text-slate-500 dark:text-slate-400"}`}
                  aria-pressed={language === "en"}
                >
                  EN
                </button>
                <button
                  onClick={() => changeLanguage("ne")}
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${language === "ne" ? "bg-white dark:bg-slate-700 text-blue-600 shadow-sm" : "text-slate-500 dark:text-slate-400"}`}
                  aria-pressed={language === "ne"}
                >
                  नेपाली
                </button>
              </div>
              <div className="hidden lg:block">
                <UserLogin />
              </div>
              <button onClick={() => setCurrentPage("admin")} className="hidden xl:inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50" title="Open admin panel">
                <ShieldCheck size={15} /> Admin
              </button>

              {/* Hamburger (below lg) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* ── Row 2 (mobile only): centered tagline ── */}
          <div className="sm:hidden flex flex-col items-center justify-center text-center pb-3 -mt-1 border-b border-gray-100 dark:border-slate-800">
            <span className="text-sm font-bold text-slate-800 dark:text-white leading-tight">
              सबैको आवाज, आवाज एकसाथ
            </span>
          </div>

          {/* Mobile inline search bar */}
          {searchOpen && (
            <div className="sm:hidden pb-2">
              <div className="flex items-center bg-gray-100 dark:bg-slate-800 rounded-xl px-4 py-2.5 gap-2">
                <Search size={15} className="text-gray-400 shrink-0" />
                <input
                  autoFocus
                  type="text"
                  placeholder={t("search")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent flex-1 text-sm text-slate-800 dark:text-slate-200 placeholder-gray-400 outline-none"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")}>
                    <X size={14} className="text-gray-400" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ── DESKTOP NAV ── */}
          <nav className="hidden lg:flex items-center gap-1 border-t border-gray-100 dark:border-slate-800">
            <button
              onClick={handleLogoClick}
              className={`px-4 py-3 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${
                currentPage === "home" && !selectedCategory
                  ? "text-blue-600 border-blue-600"
                  : "text-slate-600 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-slate-600"
              }`}
            >
              {t("home")}
            </button>

            {navCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-4 py-3 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${
                  selectedCategory === cat
                    ? "text-blue-600 border-blue-600"
                    : "text-slate-600 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-slate-600"
                }`}
              >
                {t(categoryTranslationKeys[cat], cat)}
              </button>
            ))}

            <button
              onClick={() => handleCategoryClick("Culture")}
              className={`px-4 py-3 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${
                selectedCategory === "Culture"
                  ? "text-blue-600 border-blue-600"
                  : "text-slate-600 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-slate-600"
              }`}
            >
              {t("moreStories")} ▾
            </button>

            {/* Search bar pushed to the right on desktop */}
            <div className="ml-auto flex items-center bg-gray-100 dark:bg-slate-800 rounded-full px-3 py-1.5 gap-2 w-44 xl:w-56">
              <Search size={14} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder={t("search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent flex-1 text-sm text-slate-800 dark:text-slate-200 placeholder-gray-400 outline-none"
              />
            </div>
          </nav>
        </div>
      </header>

      {/* ── MOBILE MENU OVERLAY ── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="absolute top-0 left-0 h-full w-80 max-w-[85vw] bg-white dark:bg-slate-900 shadow-2xl overflow-y-auto flex flex-col">
            {/* Drawer header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
              <button
                onClick={handleLogoClick}
                className="flex items-center gap-2"
              >
                <div className="flex flex-col leading-tight">
                  <span className="text-lg font-bold text-slate-900 dark:text-white">
                    तराई टाइम्स
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Nepal
                  </span>
                </div>
              </button>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                <X size={20} className="text-slate-600 dark:text-slate-400" />
              </button>
            </div>

            {/* Drawer search */}
            <div className="p-4 border-b border-gray-100 dark:border-slate-800">
              <div className="flex items-center bg-gray-100 dark:bg-slate-800 rounded-xl px-4 py-3 gap-2">
                <Search size={15} className="text-gray-400" />
                <input
                  type="text"
                  placeholder={t("search")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent flex-1 text-sm text-slate-800 dark:text-slate-200 placeholder-gray-400 outline-none"
                />
              </div>
            </div>

            {/* Drawer nav links */}
            <nav className="p-2 flex-1">
              <button
                onClick={handleLogoClick}
                className={`w-full text-left px-4 py-3.5 rounded-xl text-base font-semibold transition-colors min-h-[48px] ${
                  currentPage === "home" && !selectedCategory
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600"
                    : "text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                }`}
              >
                🏠 {t("home")}
              </button>
              <button
                onClick={() => {
                  setCurrentPage("admin");
                  setMobileMenuOpen(false);
                }}
                className="mt-2 flex w-full items-center gap-2 rounded-xl px-4 py-3.5 text-base font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <ShieldCheck size={18} /> Admin panel
              </button>

              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl text-base font-semibold transition-colors min-h-[48px] ${
                    selectedCategory === cat
                      ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600"
                      : "text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {cat === "World" && "🌍 "}
                  {cat === "Politics" && "🏛️ "}
                  {cat === "Tech" && "💻 "}
                  {cat === "Sports" && "⚽ "}
                  {cat === "Business" && "📈 "}
                  {cat === "Science" && "🔬 "}
                  {cat === "Health" && "❤️ "}
                  {cat === "Culture" && "🎨 "}
                  {t(categoryTranslationKeys[cat], cat)}
                </button>
              ))}
            </nav>

            {/* Drawer footer */}
            <div className="p-4 border-t border-gray-100 dark:border-slate-800">
              <div className="mb-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
                  {t("language")}
                </p>
                <div className="flex items-center gap-2 rounded-xl bg-gray-100 dark:bg-slate-800 p-1">
                  <Languages
                    size={16}
                    className="ml-2 text-slate-500 dark:text-slate-400"
                  />
                  <button
                    onClick={() => changeLanguage("en")}
                    className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${language === "en" ? "bg-white dark:bg-slate-700 text-blue-600 shadow-sm" : "text-slate-500 dark:text-slate-400"}`}
                    aria-pressed={language === "en"}
                  >
                    {t("english")}
                  </button>
                  <button
                    onClick={() => changeLanguage("ne")}
                    className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${language === "ne" ? "bg-white dark:bg-slate-700 text-blue-600 shadow-sm" : "text-slate-500 dark:text-slate-400"}`}
                    aria-pressed={language === "ne"}
                  >
                    नेपाली
                  </button>
                </div>
              </div>
              <div className="mb-3">
                <UserLogin />
              </div>
              <button
                onClick={toggleDarkMode}
                className="w-full mt-2 flex items-center justify-center gap-2 border border-gray-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium py-3.5 rounded-xl transition-colors min-h-[48px]"
              >
                {darkMode ? (
                  <Sun size={16} className="text-yellow-400" />
                ) : (
                  <Moon size={16} />
                )}
                {darkMode ? t("lightMode") : t("darkMode")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
