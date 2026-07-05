import React, { useState, useEffect } from 'react';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { isFavorite, saveFavorite, removeFavorite } from '../services/storage';

const FavoriteButton = ({ item, type, onToggle }) => {
  const [saved, setSaved] = useState(false);
  const favoriteId = `${type}_${item.name || item.recommended_style || 'item'}`;

  useEffect(() => {
    setSaved(isFavorite(favoriteId));
  }, [favoriteId]);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const favoriteData = {
      id: favoriteId,
      type: type,
      title: item.name || item.recommended_style || 'Favorite Style',
      timestamp: new Date().toISOString(),
      details: item,
    };

    if (saved) {
      removeFavorite(favoriteId);
      setSaved(false);
      if (onToggle) onToggle(false);
    } else {
      saveFavorite(favoriteData);
      setSaved(true);
      if (onToggle) onToggle(true);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`p-2.5 rounded-full shadow-md border transition-all duration-300 ${
        saved
          ? 'bg-accent-500 hover:bg-accent-600 text-white border-accent-400'
          : 'bg-white hover:bg-dark-50 dark:bg-dark-800 dark:hover:bg-dark-700 text-dark-500 dark:text-dark-300 border-dark-200 dark:border-dark-700'
      }`}
      aria-label={saved ? 'Remove from favorites' : 'Save to favorites'}
    >
      {saved ? (
        <IoHeart className="w-5 h-5 animate-pulse" />
      ) : (
        <IoHeartOutline className="w-5 h-5 hover:scale-110 transition-transform" />
      )}
    </button>
  );
};

export default FavoriteButton;
