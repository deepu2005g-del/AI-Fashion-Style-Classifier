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

  const getPlatform = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % 2 === 0 ? 'Flipkart' : 'Meesho';
  };
  
  const platform = getPlatform(item.name || '');
  
  const getSearchUrl = (name, platform) => {
    const query = encodeURIComponent(name);
    if (platform === 'Flipkart') return `https://www.flipkart.com/search?q=${query}`;
    return `https://www.meesho.com/search?q=${query}`;
  };

  const searchUrl = getSearchUrl(item.name || item.category, platform);

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
          <p className="text-xs text-dark-600 dark:text-dark-400 leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>
        
        <div className="mt-4 pt-3 border-t border-dark-100 dark:border-dark-800 flex justify-between items-center">
          <span className="text-[11px] text-dark-500 font-medium flex-1">Match <span className="ml-1 px-1.5 py-0.5 rounded-md bg-dark-100 dark:bg-dark-800 text-dark-700 dark:text-dark-300 font-bold">Active</span></span>
          <a 
            href={searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-primary-500 hover:bg-primary-600 text-white text-xs font-bold transition-colors shadow-sm whitespace-nowrap flex items-center gap-1"
          >
            Shop Trend
          </a>
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;
