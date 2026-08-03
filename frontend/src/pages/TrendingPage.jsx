import React, { useState, useEffect } from 'react';
import TrendingCard from '../components/TrendingCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchTrendingData } from '../services/api';
import { IoTrendingUp, IoFlame } from 'react-icons/io5';

const TrendingPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchTrendingData();
        setData(result);
      } catch (err) {
        console.error(err);
        setError('Unable to load trending data from the server.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <LoadingSpinner text="Fetching latest fashion trends..." />;
  if (error) return <div className="p-10 text-center text-accent-500">{error}</div>;
  if (!data) return null;

  return (
    <div className="section-container">
      {/* Header */}
      <div className="text-center space-y-3 mb-12 max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-accent-100 dark:bg-accent-950/40 text-accent-700 dark:text-accent-400 text-xs sm:text-sm font-semibold mb-2">
          <IoFlame className="animate-pulse" />
          <span>Updated Daily</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight flex items-center justify-center gap-3">
          <IoTrendingUp className="text-primary-500" /> Trending Now
        </h2>
        <p className="text-sm sm:text-base text-dark-500 dark:text-dark-400">
          Discover the most popular styles, colors, and accessories dominating the fashion world this season.
        </p>
      </div>

      {/* Trending Styles */}
      <div className="mb-16">
        <h3 className="font-heading font-bold text-2xl mb-6">Top Style Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(data.styles || []).map((style, idx) => (
            <TrendingCard key={idx} item={style} />
          ))}
        </div>
      </div>

      {/* Trending Colors & Accessories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Colors */}
        <div>
          <h3 className="font-heading font-bold text-2xl mb-6">Trending Colors</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {(data.colors || []).map((color, idx) => {
              const platform = idx % 2 === 0 ? 'Flipkart' : 'Meesho';
              const searchUrl = platform === 'Flipkart' 
                ? `https://www.flipkart.com/search?q=${encodeURIComponent(color.name + ' fashion')}`
                : `https://www.meesho.com/search?q=${encodeURIComponent(color.name + ' fashion')}`;
                
              return (
                <a 
                  href={searchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={idx} 
                  className="glass-card-hover p-4 flex flex-col items-center justify-center text-center space-y-3 relative group cursor-pointer block"
                  title={`Shop ${color.name} Fashion`}
                >
                  <div 
                    className="w-12 h-12 rounded-full shadow-inner border border-black/10 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  <div>
                    <div className="font-bold text-sm text-dark-800 dark:text-dark-200 group-hover:text-primary-500 transition-colors">{color.name}</div>
                    <div className="text-[10px] text-dark-400 uppercase tracking-wider">{color.hex}</div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Accessories */}
        <div>
          <h3 className="font-heading font-bold text-2xl mb-6">Trending Accessories</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {(data.accessories || []).map((acc, idx) => {
              const platform = idx % 2 === 0 ? 'Meesho' : 'Flipkart';
              const searchUrl = platform === 'Flipkart' 
                ? `https://www.flipkart.com/search?q=${encodeURIComponent(acc.name)}`
                : `https://www.meesho.com/search?q=${encodeURIComponent(acc.name)}`;

              return (
                <a 
                  href={searchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={idx} 
                  className="glass-card-hover p-4 text-center group cursor-pointer block"
                  title={`Shop ${acc.name}`}
                >
                  <div className="text-3xl mb-2 group-hover:scale-125 group-hover:-translate-y-1 transition-transform duration-300">
                    {acc.icon}
                  </div>
                  <div className="font-bold text-sm group-hover:text-primary-500 transition-colors">{acc.name}</div>
                  <div className="text-xs text-primary-500 dark:text-primary-400 font-semibold mt-1">
                    Pop: {acc.popularity}%
                  </div>
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TrendingPage;
