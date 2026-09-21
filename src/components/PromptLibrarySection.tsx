import React, { useState, useMemo } from "react";
import { Copy, Check, Search } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import translations from "../data/translations";
import prompts from "../data/prompts";

const PROMPT_CATEGORIES = ["All", "Lesson Planning", "Assessments", "Activities", "Simplification", "Vocabulary", "Differentiation"];

const categoryColors: Record<string, string> = {
  "Lesson Planning": "text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/30 border-violet-200 dark:border-violet-800",
  "Assessments": "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800",
  "Activities": "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800",
  "Simplification": "text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800",
  "Vocabulary": "text-pink-600 dark:text-pink-400 bg-pink-100 dark:bg-pink-900/30 border-pink-200 dark:border-pink-800",
  "Differentiation": "text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-800",
};

const PromptLibrarySection: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const isAr = language === "ar";
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    let result = prompts;
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(s) ||
          p.titleAr.includes(search) ||
          p.prompt.toLowerCase().includes(s)
      );
    }
    return result;
  }, [search, activeCategory]);

  const copyPrompt = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            📋 {t.promptLibrary}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Ready-to-use AI prompts for teachers
          </p>
        </div>
        <div className="sm:ml-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.searchPromptsPlaceholder}
            className="pl-9 pr-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 w-56"
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {PROMPT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              activeCategory === cat
                ? "bg-violet-600 text-white shadow-md shadow-violet-500/30"
                : "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((prompt) => (
          <div
            key={prompt.id}
            className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-0.5">
                  {isAr ? prompt.titleAr : prompt.title}
                </h3>
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium border ${
                    categoryColors[prompt.category] || "text-gray-500 bg-gray-100 border-gray-200"
                  }`}
                >
                  {prompt.category}
                </span>
              </div>
              <button
                onClick={() => copyPrompt(prompt.id, isAr ? prompt.promptAr : prompt.prompt)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 shrink-0 ${
                  copiedId === prompt.id
                    ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-violet-100 dark:hover:bg-violet-900/30 hover:text-violet-600 dark:hover:text-violet-400"
                }`}
              >
                {copiedId === prompt.id ? (
                  <><Check className="w-3 h-3" /> {t.promptCopied}</>
                ) : (
                  <><Copy className="w-3 h-3" /> {t.copyPrompt}</>
                )}
              </button>
            </div>
            <p
              className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-mono bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 line-clamp-4"
              dir={isAr ? "rtl" : "ltr"}
            >
              {isAr ? prompt.promptAr : prompt.prompt}
            </p>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-400 dark:text-gray-500">
            {t.noPromptsFound}
          </div>
        )}
      </div>
    </section>
  );
};

export default PromptLibrarySection;
