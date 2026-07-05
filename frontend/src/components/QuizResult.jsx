import React from 'react';
import { IoBarChartOutline, IoSparklesOutline, IoHeart } from 'react-icons/io5';
import FavoriteButton from './FavoriteButton';

const QuizResult = ({ recommendedStyle, suitability, reason, alternatives }) => {
  // Styles mapping configurations
  const themeConfigs = {
    Casual: {
      accent: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-950/20',
      fill: 'bg-blue-500',
      border: 'border-blue-200 dark:border-blue-900/30'
    },
    Ethnic: {
      accent: 'text-amber-500',
      bg: 'bg-amber-50 dark:bg-amber-950/20',
      fill: 'bg-amber-500',
      border: 'border-amber-200 dark:border-amber-900/30'
    },
    Formal: {
      accent: 'text-indigo-600',
      bg: 'bg-indigo-50 dark:bg-indigo-950/20',
      fill: 'bg-indigo-600',
      border: 'border-indigo-200 dark:border-indigo-900/30'
    },
    Sports: {
      accent: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-950/20',
      fill: 'bg-emerald-500',
      border: 'border-emerald-200 dark:border-emerald-900/30'
    }
  };

  const styleConfig = themeConfigs[recommendedStyle] || themeConfigs.Casual;

  return (
    <div className="space-y-8">
      {/* Principal Match Banner */}
      <div className={`p-6 sm:p-8 rounded-2xl border ${styleConfig.bg} ${styleConfig.border} flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 animate-scale-in`}>
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-wider font-extrabold opacity-70 flex items-center gap-1">
            <IoSparklesOutline className="animate-spin-slow" /> Recommended Style Match
          </span>
          <h3 className={`text-4xl sm:text-5xl font-heading font-extrabold tracking-tight ${styleConfig.accent}`}>
            {recommendedStyle}
          </h3>
          <p className="text-sm sm:text-base text-dark-700 dark:text-dark-300 max-w-md font-medium leading-relaxed pt-1">
            "{reason}"
          </p>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0 border-dark-200 dark:border-dark-800">
          <div className="text-left sm:text-right">
            <span className="text-xs uppercase tracking-wider font-semibold opacity-70">Suitability Index</span>
            <div className="text-4xl sm:text-5xl font-heading font-black mt-1">{suitability}%</div>
          </div>
          <div className="mt-3">
            <FavoriteButton item={{ recommended_style: recommendedStyle, reason }} type="recommendation" />
          </div>
        </div>
      </div>

      {/* Main progress index visualizer */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm font-semibold">
          <span>Overall Match Level</span>
          <span>{suitability}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className={`progress-fill ${styleConfig.fill}`}
            style={{ width: `${suitability}%` }}
          />
        </div>
      </div>

      {/* Alternatives Analysis */}
      {alternatives && alternatives.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-heading font-bold text-lg flex items-center gap-2">
            <IoBarChartOutline className="text-primary-500" />
            Style Profile Breakdown
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {alternatives.map((alt) => {
              const currentConfig = themeConfigs[alt.style] || themeConfigs.Casual;
              return (
                <div key={alt.style} className="p-4 rounded-xl border border-dark-200 dark:border-dark-800 bg-white dark:bg-dark-900 flex flex-col justify-between gap-3 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm">{alt.style}</span>
                    <span className="text-xs font-black text-dark-500">{alt.suitability}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-dark-100 dark:bg-dark-800 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${currentConfig.fill}`} 
                      style={{ width: `${alt.suitability}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizResult;
