import { useEffect } from "react";
import {
  Search,
  Moon,
  Sun,
  Menu,
  X,
  Zap,
  Languages,
  ShieldCheck,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { categories } from "../data/newsData";
import { categoryTranslationKeys } from "../utils/translations";
import UserLogin from "./auth/Login";

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

      <header className="relative lg:sticky lg:top-0 z-50 bg-gradient-to-r from-yellow-100 via-amber-200 to-yellow-100 dark:from-yellow-950 dark:via-amber-900 dark:to-yellow-950 border-b border-yellow-300 dark:border-amber-800 shadow-sm transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-4">
          {/* Centered brand heading and subheading */}
          <div className="relative flex flex-col items-center justify-center py-4 sm:py-5">
            <button
              onClick={handleLogoClick}
              className="group"
              aria-label="Go to homepage"
            >
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-black to-red-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform inline-block">
                तराई टाइम्स
              </span>
            </button>
            <span className="mt-1 text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-300 leading-tight">
              सबैको आवाज, आवाज एकसाथ
            </span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="hidden lg:flex absolute top-5 left-4 items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu size={19} />
            Menu
          </button>

          {/* Mobile actions remain beside the compact header */}
          <div className="sm:hidden absolute top-4 right-3 flex items-center gap-1">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </header>

      {/* ── MOBILE MENU OVERLAY ── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="absolute top-0 left-0 h-full w-80 lg:w-96 max-w-[90vw] bg-white dark:bg-slate-900 shadow-2xl overflow-y-auto flex flex-col">
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
              <button
                onClick={() => {
                  setCurrentPage("admin");
                  setMobileMenuOpen(false);
                }}
                className="w-full mt-3 flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3.5 text-base font-semibold text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:hover:bg-red-900/20"
              >
                <ShieldCheck size={18} /> Admin panel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
