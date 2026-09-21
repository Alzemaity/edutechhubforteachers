import React, { useState } from "react";
import { ExternalLink, Star } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import translations from "../data/translations";
import type { Tool } from "../data/tools";

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const isAr = language === "ar";
  const [imgError, setImgError] = useState(false);

  const faviconUrl = `https://www.google.com/s2/favicons?domain=${new URL(tool.url).hostname}&sz=64`;

  const description = isAr ? tool.descriptionAr : tool.description;

  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-5 hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-xl hover:shadow-violet-500/10 dark:hover:shadow-violet-900/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
    >
      {/* Background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-indigo-500/0 group-hover:from-violet-500/5 group-hover:to-indigo-500/5 transition-all duration-300 rounded-2xl" />

      {/* Top Row: Logo + Badge */}
      <div className="flex items-start justify-between mb-3 relative">
        <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center overflow-hidden group-hover:border-violet-300 dark:group-hover:border-violet-700 transition-colors duration-300">
          {!imgError ? (
            <img
              src={faviconUrl}
              alt={tool.name}
              className="w-8 h-8 object-contain"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              {tool.name[0]}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {tool.topPick && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
              <Star className="w-2.5 h-2.5 fill-current" />
              Top
            </span>
          )}
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${
              tool.type === "ai"
                ? "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-800"
                : "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800"
            }`}
          >
            {tool.type === "ai" ? "AI" : "EdTech"}
          </span>
        </div>
      </div>

      {/* Name */}
      <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1.5 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-200 relative">
        {tool.name}
      </h3>

      {/* Description */}
      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed flex-1 line-clamp-2 relative">
        {description}
      </p>

      {/* Visit Button */}
      <div className="mt-4 flex items-center justify-between relative">
        <div className="flex flex-wrap gap-1">
          {tool.categories.slice(0, 2).map((cat) => (
            <span
              key={cat}
              className="px-1.5 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
            >
              {cat}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1 text-xs font-medium text-violet-600 dark:text-violet-400 group-hover:gap-1.5 transition-all duration-200">
          <span className="hidden sm:inline">{t.visitWebsite}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </div>
      </div>
    </a>
  );
};

export default ToolCard;
