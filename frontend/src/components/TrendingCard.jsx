import React from 'react';
import FavoriteButton from './FavoriteButton';

const TrendingCard = ({ item }) => {
  // Config styles based on categories
  const categoryBgs = {
    Casual: 'from-blue-400 to-indigo-500',
    Ethnic: 'from-amber-400 to-rose-500',
    Formal: 'from-purple-500 to-indigo-600',
    Sports: 'from-emerald-400 to-teal-500',
  };

  const gradient = categoryBgs[item.category] || categoryBgs.Casual;

  return (
    <div className="glass-card-hover overflow-hidden flex flex-col group h-full">
      {/* Decorative header */}
      <div className={`h-36 bg-gradient-to-br ${gradient} flex items-center justify-center relative p-4`}>
        <div className="text-5xl filter drop-shadow-md transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
          {item.icon || '✨'}
        </div>
        
        {/* Favorite toggle overlay */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300">
          <FavoriteButton item={item} type="trending" />
        </div>

        <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md text-[9px] uppercase font-bold text-white tracking-wider flex items-center gap-1">
          <span>🔥</span> Popularity: {item.popularity}%
        </div>
      </div>

      {/* Body Details */}
      <div className="p-4 flex-grow flex flex-col justify-between bg-white dark:bg-dark-900/60">
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-primary-500 dark:text-primary-400 uppercase tracking-wider">
            Category: {item.category}
          </span>
          <h4 className="font-heading font-bold text-dark-800 dark:text-dark-100 text-base leading-snug">
            {item.name}
          </h4>
          <p className="text-xs text-dark-600 dark:text-dark-400 leading-relaxed">
            {item.description}
          </p>
        </div>
        
        <div className="mt-4 pt-3 border-t border-dark-100 dark:border-dark-800 text-[11px] text-dark-500 flex justify-between items-center font-medium">
          <span>Seasonal Match</span>
          <span className="px-1.5 py-0.5 rounded-md bg-dark-100 dark:bg-dark-800 text-dark-700 dark:text-dark-300 font-bold">Active</span>
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;
