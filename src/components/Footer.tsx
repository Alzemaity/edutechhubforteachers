import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import translations from "../data/translations";
import { BookOpen } from "lucide-react";

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="mt-16 border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <BookOpen className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-gray-700 dark:text-gray-300">{t.siteTitle}</span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
            {t.footer}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} EduTech Hub
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
