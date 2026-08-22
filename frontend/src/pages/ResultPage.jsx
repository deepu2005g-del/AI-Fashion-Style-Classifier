import React, { useState } from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import PredictionResult from '../components/PredictionResult';
import QuizResult from '../components/QuizResult';
import OutfitCard from '../components/OutfitCard';
import { IoArrowBack, IoColorPaletteOutline, IoCalendarOutline, IoPartlySunnyOutline } from 'react-icons/io5';

const ResultPage = () => {
  const location = useLocation();
  const state = location.state;
  const [activeFilters, setActiveFilters] = useState([]);

  // If no state (user navigated directly), redirect to home
  if (!state) {
    return <Navigate to="/" replace />;
  }

  const {
    source, // 'upload' or 'quiz'
    prediction,
    confidence,
    all_predictions,
    recommended_style,
    suitability,
    alternatives,
    reason,
    suggestions,
  } = state;

  const toggleFilter = (filter) => {
    setActiveFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const clearFilters = () => {
    setActiveFilters([]);
  };

  // Helper to split season string into individual season items if needed
  const getSeasonsList = (seasonStr) => {
    if (!seasonStr) return ["All Seasons"];
    if (seasonStr.includes('&')) {
      return seasonStr.split('&').map(s => s.trim());
    }
    return [seasonStr];
  };

  const seasonsList = getSeasonsList(suggestions?.season);

  return (
    <div className="section-container">
      {/* Back navigation */}
      <div className="mb-6">
        <Link 
          to={source === 'upload' ? '/upload' : '/quiz'}
          className="inline-flex items-center text-sm font-semibold text-dark-500 hover:text-primary-500 transition-colors"
        >
          <IoArrowBack className="mr-1.5 w-4 h-4" />
          Back to {source === 'upload' ? 'Upload' : 'Quiz'}
        </Link>
      </div>

      <div className="space-y-12">
        {/* Main Result Component */}
        <section>
          <h2 className="font-heading font-bold text-2xl mb-6 flex items-center gap-2">
            Analysis Results
          </h2>
          {source === 'upload' ? (
            <PredictionResult 
              prediction={prediction}
              confidence={confidence}
              allPredictions={all_predictions}
              reason={reason}
            />
          ) : (
            <QuizResult 
              recommendedStyle={recommended_style}
              suitability={suitability}
              reason={reason}
              alternatives={alternatives}
            />
          )}
        </section>

        {/* Suggestions / Wardrobe builder */}
        {suggestions && (
          <section className="border-t border-dark-200 dark:border-dark-800 pt-10">
            <div className="text-center space-y-3 mb-10 max-w-2xl mx-auto">
              <span className="badge-primary">Wardrobe Builder</span>
              <h2 className="text-3xl font-heading font-extrabold tracking-tight">
                Recommended Pieces
              </h2>
              <p className="text-sm text-dark-500 dark:text-dark-400">
                Curated clothing items and accessories that perfectly match your {prediction || recommended_style} aesthetic.
              </p>
              {activeFilters.length > 0 && (
                <div className="pt-2 flex items-center justify-center gap-2">
                  <span className="text-xs font-semibold text-primary-500">Active filters:</span>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {activeFilters.map(f => (
                      <span key={f} className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-500 text-white flex items-center gap-1">
                        {f}
                        <button onClick={() => toggleFilter(f)} className="hover:text-dark-200">×</button>
                      </span>
                    ))}
                  </div>
                  <button 
                    onClick={clearFilters}
                    className="text-xs font-bold text-accent-500 hover:underline ml-2"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>

            {/* Metadata (Colors, Occasions, Seasons) as interactive multi-select filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="p-6 rounded-2xl bg-dark-50 dark:bg-dark-900 border border-dark-200 dark:border-dark-800">
                <div className="flex items-center gap-2 font-bold mb-4">
                  <IoColorPaletteOutline className="text-primary-500 w-5 h-5" />
                  Color Palette (Select Multiple)
                </div>
                <div className="flex flex-wrap gap-2">
                  {(suggestions.colors || []).map(color => {
                    const isSelected = activeFilters.includes(color);
                    return (
                      <button 
                        key={color} 
                        onClick={() => toggleFilter(color)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                          isSelected 
                            ? 'bg-primary-500 text-white border-primary-500 shadow-md scale-105' 
                            : 'bg-white dark:bg-dark-800 border-dark-200 dark:border-dark-700 hover:border-primary-400'
                        }`}
                      >
                        {isSelected ? `✓ ${color}` : color}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-dark-50 dark:bg-dark-900 border border-dark-200 dark:border-dark-800">
                <div className="flex items-center gap-2 font-bold mb-4">
                  <IoCalendarOutline className="text-accent-500 w-5 h-5" />
                  Best Occasions (Select Multiple)
                </div>
                <div className="flex flex-wrap gap-2">
                  {(suggestions.occasions || []).map(occ => {
                    const isSelected = activeFilters.includes(occ);
                    return (
                      <button 
                        key={occ} 
                        onClick={() => toggleFilter(occ)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                          isSelected 
                            ? 'bg-accent-500 text-white border-accent-500 shadow-md scale-105' 
                            : 'bg-white dark:bg-dark-800 border-dark-200 dark:border-dark-700 hover:border-accent-400'
                        }`}
                      >
                        {isSelected ? `✓ ${occ}` : occ}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-dark-50 dark:bg-dark-900 border border-dark-200 dark:border-dark-800">
                <div className="flex items-center gap-2 font-bold mb-4">
                  <IoPartlySunnyOutline className="text-blue-500 w-5 h-5" />
                  Ideal Seasons (Select Multiple)
                </div>
                <div className="flex flex-wrap gap-2">
                  {seasonsList.map(season => {
                    const isSelected = activeFilters.includes(season);
                    return (
                      <button 
                        key={season} 
                        onClick={() => toggleFilter(season)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                          isSelected 
                            ? 'bg-blue-500 text-white border-blue-500 shadow-md scale-105' 
                            : 'bg-white dark:bg-dark-800 border-dark-200 dark:border-dark-700 hover:border-blue-400'
                        }`}
                      >
                        {isSelected ? `✓ ${season}` : season}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Outfits Grid */}
            <div className="mb-10">
              <h3 className="font-heading font-bold text-xl mb-6">Core Clothing</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {(suggestions.outfit_details || []).map((item, idx) => (
                  <OutfitCard key={idx} item={item} category={item.category} activeFilters={activeFilters} />
                ))}
              </div>
            </div>

            {/* Accessories Grid */}
            <div className="mb-10">
              <h3 className="font-heading font-bold text-xl mb-6">Accessories & Footwear</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {(suggestions.accessory_details || []).map((item, idx) => (
                  <OutfitCard key={`acc-${idx}`} item={item} category="accessory" activeFilters={activeFilters} />
                ))}
                {(suggestions.footwear_details || []).map((item, idx) => (
                  <OutfitCard key={`foot-${idx}`} item={item} category="footwear" activeFilters={activeFilters} />
                ))}
              </div>
            </div>

          </section>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
