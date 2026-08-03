import React, { useState } from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import PredictionResult from '../components/PredictionResult';
import QuizResult from '../components/QuizResult';
import OutfitCard from '../components/OutfitCard';
import { IoArrowBack, IoColorPaletteOutline, IoCalendarOutline, IoPartlySunnyOutline } from 'react-icons/io5';

const ResultPage = () => {
  const location = useLocation();
  const state = location.state;
  const [activeFilter, setActiveFilter] = useState(null);

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
    if (activeFilter === filter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filter);
    }
  };

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
            </div>

            {/* Metadata (Colors, Occasions, Seasons) as interactive filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="p-6 rounded-2xl bg-dark-50 dark:bg-dark-900 border border-dark-200 dark:border-dark-800">
                <div className="flex items-center gap-2 font-bold mb-4">
                  <IoColorPaletteOutline className="text-primary-500 w-5 h-5" />
                  Color Palette (Click to Filter)
                </div>
                <div className="flex flex-wrap gap-2">
                  {(suggestions.colors || []).map(color => (
                    <button 
                      key={color} 
                      onClick={() => toggleFilter(color)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                        activeFilter === color 
                          ? 'bg-primary-500 text-white border-primary-500 shadow-md scale-105' 
                          : 'bg-white dark:bg-dark-800 border-dark-200 dark:border-dark-700 hover:border-primary-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-dark-50 dark:bg-dark-900 border border-dark-200 dark:border-dark-800">
                <div className="flex items-center gap-2 font-bold mb-4">
                  <IoCalendarOutline className="text-accent-500 w-5 h-5" />
                  Best Occasions (Click to Filter)
                </div>
                <div className="flex flex-wrap gap-2">
                  {(suggestions.occasions || []).map(occ => (
                    <button 
                      key={occ} 
                      onClick={() => toggleFilter(occ)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                        activeFilter === occ 
                          ? 'bg-accent-500 text-white border-accent-500 shadow-md scale-105' 
                          : 'bg-white dark:bg-dark-800 border-dark-200 dark:border-dark-700 hover:border-accent-400'
                      }`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-dark-50 dark:bg-dark-900 border border-dark-200 dark:border-dark-800">
                <div className="flex items-center gap-2 font-bold mb-4">
                  <IoPartlySunnyOutline className="text-blue-500 w-5 h-5" />
                  Ideal Seasons
                </div>
                <button 
                  onClick={() => toggleFilter(suggestions.season)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    activeFilter === suggestions.season 
                      ? 'bg-blue-500 text-white border-blue-500 shadow-md scale-105' 
                      : 'bg-white dark:bg-dark-800 border-dark-200 dark:border-dark-700 hover:border-blue-400'
                  }`}
                >
                  {suggestions.season}
                </button>
              </div>
            </div>

            {/* Outfits Grid */}
            <div className="mb-10">
              <h3 className="font-heading font-bold text-xl mb-6">Core Clothing</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {(suggestions.outfit_details || []).map((item, idx) => (
                  <OutfitCard key={idx} item={item} category={item.category} activeFilter={activeFilter} />
                ))}
              </div>
            </div>

            {/* Accessories Grid */}
            <div className="mb-10">
              <h3 className="font-heading font-bold text-xl mb-6">Accessories & Footwear</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {(suggestions.accessory_details || []).map((item, idx) => (
                  <OutfitCard key={`acc-${idx}`} item={item} category="accessory" activeFilter={activeFilter} />
                ))}
                {(suggestions.footwear_details || []).map((item, idx) => (
                  <OutfitCard key={`foot-${idx}`} item={item} category="footwear" activeFilter={activeFilter} />
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
