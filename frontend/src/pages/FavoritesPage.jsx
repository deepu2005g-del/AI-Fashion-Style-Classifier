import React, { useState, useEffect } from 'react';
import { getFavorites, removeFavorite } from '../services/storage';
import { IoHeart, IoTrashOutline, IoShirtOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleRemove = (id) => {
    const updated = removeFavorite(id);
    setFavorites(updated);
  };

  const outfits = favorites.filter(f => f.type === 'outfit');
  const recommendations = favorites.filter(f => f.type === 'recommendation');

  return (
    <div className="section-container min-h-[60vh]">
      <div className="flex items-center gap-3 mb-10 border-b border-dark-200 dark:border-dark-800 pb-6">
        <IoHeart className="w-8 h-8 text-accent-500" />
        <h2 className="text-3xl font-heading font-extrabold">Your Saved Collection</h2>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20 bg-dark-50 dark:bg-dark-900/30 rounded-3xl border border-dark-200 dark:border-dark-800 border-dashed">
          <IoHeart className="w-16 h-16 text-dark-300 dark:text-dark-700 mx-auto mb-4" />
          <h3 className="text-xl font-heading font-bold text-dark-700 dark:text-dark-300 mb-2">No favorites yet</h3>
          <p className="text-dark-500 mb-6">Start exploring styles and save your favorite outfits here.</p>
          <div className="flex justify-center gap-4">
            <Link to="/upload" className="btn-primary text-sm px-4 py-2">Upload Image</Link>
            <Link to="/quiz" className="btn-secondary text-sm px-4 py-2">Take Style Quiz</Link>
          </div>
        </div>
      ) : (
        <div className="space-y-12">
          
          {/* Outfits Section */}
          {outfits.length > 0 && (
            <section>
              <h3 className="font-heading font-bold text-xl mb-6 flex items-center gap-2">
                <IoShirtOutline className="text-primary-500" /> Saved Outfits
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {outfits.map(fav => (
                  <div key={fav.id} className="glass-card-hover p-4 relative group">
                    <button 
                      onClick={() => handleRemove(fav.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-accent-100 text-accent-600 opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-accent-500 hover:text-white"
                    >
                      <IoTrashOutline className="w-4 h-4" />
                    </button>
                    <div className="text-4xl text-center py-6 bg-dark-50 dark:bg-dark-800 rounded-xl mb-3">
                      {fav.details.icon || '👕'}
                    </div>
                    <div className="font-bold text-sm text-center line-clamp-1">{fav.details.name}</div>
                    <div className="text-[10px] text-center text-dark-400 mt-1 uppercase tracking-wider">{fav.details.category}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Recommendations Section */}
          {recommendations.length > 0 && (
            <section>
              <h3 className="font-heading font-bold text-xl mb-6 flex items-center gap-2">
                <IoHeart className="text-accent-500" /> Saved Style Matches
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.map(fav => (
                  <div key={fav.id} className="glass-card-hover p-5 relative group flex items-start gap-4 border-l-4 border-l-primary-500">
                    <button 
                      onClick={() => handleRemove(fav.id)}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-accent-100 text-accent-600 opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-accent-500 hover:text-white"
                    >
                      <IoTrashOutline className="w-4 h-4" />
                    </button>
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-primary-500 uppercase tracking-wider mb-1">Style Match</div>
                      <h4 className="font-heading font-bold text-2xl mb-2">{fav.details.recommended_style}</h4>
                      <p className="text-sm text-dark-600 dark:text-dark-300 line-clamp-2">{fav.details.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
