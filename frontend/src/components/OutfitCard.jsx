import React from 'react';
import FavoriteButton from './FavoriteButton';

const OutfitCard = ({ item, category }) => {
  // Simple CSS gradients as visual placeholder cards for clothing images
  const gradientBgs = [
    'from-indigo-500 to-purple-500',
    'from-pink-500 to-rose-500',
    'from-emerald-400 to-teal-500',
    'from-amber-400 to-orange-500',
    'from-blue-500 to-indigo-500',
  ];

  const getDeterministicGradient = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash % gradientBgs.length);
    return gradientBgs[index];
  };

  const cardGradient = getDeterministicGradient(item.name || item);
  const itemName = item.name || item;
  const itemIcon = item.icon || '👕';
  const itemCategory = item.category || category || 'clothing';

  return (
    <div className="glass-card-hover overflow-hidden flex flex-col group h-full">
      {/* Visual Placeholder Header */}
      <div className={`h-40 bg-gradient-to-br ${cardGradient} flex items-center justify-center relative p-4 transition-transform duration-300`}>
        <div className="text-6xl filter drop-shadow-md transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
          {itemIcon}
        </div>
        
        {/* Favorite toggle overlay */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300">
          <FavoriteButton item={{ name: itemName, icon: itemIcon, category: itemCategory }} type="outfit" />
        </div>

        <div className="absolute bottom-3 left-3 bg-black/45 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] uppercase font-bold text-white tracking-wider">
          {itemCategory}
        </div>
      </div>

      {/* Info Body */}
      <div className="p-4 flex-grow flex flex-col justify-between bg-white dark:bg-dark-900/60">
        <div>
          <h4 className="font-heading font-bold text-dark-800 dark:text-dark-100 text-base leading-snug mb-1">
            {itemName}
          </h4>
          <p className="text-xs text-dark-500 dark:text-dark-400">
            Perfect fit for your matched {itemCategory} wardrobe collection.
          </p>
        </div>
        
        <div className="mt-4 pt-3 border-t border-dark-100 dark:border-dark-800 flex justify-between items-center text-xs">
          <span className="text-primary-500 dark:text-primary-400 font-semibold uppercase tracking-wider">Trending</span>
          <span className="text-dark-400">Match Rate 95%</span>
        </div>
      </div>
    </div>
  );
};

export default OutfitCard;
