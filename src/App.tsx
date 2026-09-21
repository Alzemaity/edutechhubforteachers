import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FilterSection from "./components/FilterSection";
import ToolGrid from "./components/ToolGrid";
import HomeCategoryNav from "./components/HomeCategoryNav";
import PromptLibrarySection from "./components/PromptLibrarySection";
import AIAgentsSection from "./components/AIAgentsSection";
import { useFilterState } from "./hooks/useFilterState";
import { useLanguage } from "./contexts/LanguageContext";
import translations from "./data/translations";

const MainPage: React.FC = () => {
  const { filters, updateFilter, clearFilters, hasActiveFilters } = useFilterState();
  const [totalResults, setTotalResults] = useState(0);
  const { language } = useLanguage();
  const t = translations[language];

  const handleSearchChange = useCallback(
    (val: string) => updateFilter("search", val),
    [updateFilter]
  );

  const hasFilters = hasActiveFilters || filters.category !== "" || filters.subject !== "";

  return (
    <>
      <Header searchValue={filters.search} onSearchChange={handleSearchChange} />
      <main className="min-h-screen">
        {!hasFilters ? (
          <>
            {/* Home: Category Nav + AI Agents + Prompt Library */}
            <HomeCategoryNav />
            <div className="max-w-7xl mx-auto px-4">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent my-4" />
            </div>
            <AIAgentsSection />
            <div className="max-w-7xl mx-auto px-4">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent my-4" />
            </div>
            <PromptLibrarySection />
            <div className="max-w-7xl mx-auto px-4">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent my-4" />
            </div>
            {/* Show all tools below */}
            <section className="max-w-7xl mx-auto px-4 py-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                🛠️ All Tools
                <span className="ml-2 text-sm font-normal text-gray-400 dark:text-gray-500">
                  ({totalResults} {t.results})
                </span>
              </h2>
              <ToolGrid filters={filters} onResultsChange={setTotalResults} />
            </section>
          </>
        ) : (
          <>
            <FilterSection
              filters={filters}
              onFilterChange={updateFilter}
              onClearFilters={clearFilters}
              hasActiveFilters={hasActiveFilters}
              totalResults={totalResults}
            />
            <section className="max-w-7xl mx-auto px-4 pb-12">
              <ToolGrid filters={filters} onResultsChange={setTotalResults} />
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

const NotFoundPage: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-violet-600 mb-4">404</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Page not found</p>
      <a href="/" className="px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors">
        Back to Home
      </a>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
