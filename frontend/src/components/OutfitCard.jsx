import React, { useState } from 'react';
import FavoriteButton from './FavoriteButton';
import { FiShoppingBag, FiDownload } from 'react-icons/fi';

// Fallback high quality curated fashion images mapping by category and keywords
const FASHION_IMAGES = {
  women: {
    top: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80'
    ],
    bottom: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=600&auto=format&fit=crop&q=80'
    ],
    outerwear: [
      'https://images.unsplash.com/photo-1548624149-f7b9768865ef?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80'
    ],
    full: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80'
    ],
    ethnic: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&auto=format&fit=crop&q=80'
    ]
  },
  men: {
    top: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80'
    ],
    bottom: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&auto=format&fit=crop&q=80'
    ],
    outerwear: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80'
    ],
    full: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&auto=format&fit=crop&q=80'
    ],
    ethnic: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&auto=format&fit=crop&q=80'
    ]
  },
  footwear: [
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80'
  ],
  accessory: [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80'
  ],
  fallback: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80'
};

const OutfitCard = ({ item, category, activeFilter, activeFilters }) => {
  const itemName = item?.name || (typeof item === 'string' ? item : 'Clothing Item');
  const itemIcon = item?.icon || '👕';
  const itemCategory = item?.category || category || 'clothing';

  // Format active filter string if passed as array or single string
  let filterStr = '';
  if (Array.isArray(activeFilters) && activeFilters.length > 0) {
    filterStr = activeFilters.join(' ');
  } else if (typeof activeFilter === 'string' && activeFilter) {
    filterStr = activeFilter;
  }

  // Hash string helper for deterministic selections
  const getHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  };

  // Determine realistic photo URL
  const getImageUrl = (name, cat) => {
    const isWomen = name.toLowerCase().includes("women") || name.toLowerCase().includes("saree") || name.toLowerCase().includes("lehenga") || name.toLowerCase().includes("jhumka") || name.toLowerCase().includes("bra");
    const genderKey = isWomen ? 'women' : 'men';
    const hash = getHash(name);

    if (cat === 'footwear') {
      const list = FASHION_IMAGES.footwear;
      return list[hash % list.length];
    }
    if (cat === 'accessory' || cat === 'accessories') {
      const list = FASHION_IMAGES.accessory;
      return list[hash % list.length];
    }
    
    if (name.toLowerCase().includes('kurta') || name.toLowerCase().includes('ethnic') || name.toLowerCase().includes('saree') || name.toLowerCase().includes('lehenga')) {
      const list = FASHION_IMAGES[genderKey].ethnic;
      return list[hash % list.length];
    }

    const catKey = FASHION_IMAGES[genderKey][cat] ? cat : 'top';
    const list = FASHION_IMAGES[genderKey][catKey] || FASHION_IMAGES.women.top;
    return list[hash % list.length];
  };

  const initialImageUrl = getImageUrl(itemName, itemCategory);
  const [imgSrc, setImgSrc] = useState(initialImageUrl);

  // Fallback image handler in case network or URL fails
  const handleImageError = () => {
    if (imgSrc !== FASHION_IMAGES.fallback) {
      setImgSrc(FASHION_IMAGES.fallback);
    }
  };

  // Determine shopping platform (Flipkart or Meesho) deterministically based on item name
  const platform = getHash(itemName) % 2 === 0 ? 'Flipkart' : 'Meesho';

  // Construct search URL for online shopping
  const getSearchUrl = (name, cat, plat, filterText) => {
    const queryTerm = filterText ? `${filterText} ${name} ${cat}` : `${name} ${cat}`;
    const query = encodeURIComponent(queryTerm);
    if (plat === 'Flipkart') {
      return `https://www.flipkart.com/search?q=${query}`;
    } else {
      return `https://www.meesho.com/search?q=${query}`;
    }
  };

  const searchUrl = getSearchUrl(itemName, itemCategory, platform, filterStr);

  // Generate realistic price in INR
  const price = (299 + (getHash(itemName) % 2000)).toString();

  const handleDownload = async (e, url, name) => {
    e.preventDefault();
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${name.replace(/\s+/g, '_').toLowerCase()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      window.open(url, '_blank');
    }
  };

  const displayName = filterStr ? `${filterStr} ${itemName}` : itemName;

  return (
    <div className="glass-card-hover overflow-hidden flex flex-col group h-full bg-white dark:bg-dark-900 shadow-sm border border-dark-100 dark:border-dark-800 rounded-xl relative">
      {/* Product Image Area */}
      <div className="relative h-56 w-full overflow-hidden bg-dark-50 dark:bg-dark-950">
        <img 
          src={imgSrc} 
          alt={itemName}
          onError={handleImageError}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="absolute top-3 left-3 bg-white/90 dark:bg-dark-900/90 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-bold text-dark-800 dark:text-dark-100 flex items-center gap-1.5 shadow-sm">
          <span>{itemIcon}</span>
          <span className="uppercase tracking-wider text-[10px]">{itemCategory}</span>
        </div>

        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 z-10 bg-white/80 dark:bg-dark-800/80 backdrop-blur rounded-full shadow-sm hover:bg-white">
          <FavoriteButton item={{ name: itemName, icon: itemIcon, category: itemCategory }} type="outfit" />
        </div>
        
        {/* Platform Badge */}
        <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-dark-900/90 backdrop-blur-md px-2 py-1 rounded-md text-xs font-bold shadow-sm">
          <span className={platform === 'Flipkart' ? 'text-[#2874f0]' : 'text-[#f43397]'}>{platform}</span>
        </div>
      </div>

      {/* Product Details Area */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-1">
            <h4 className="font-heading font-bold text-dark-800 dark:text-dark-100 text-base leading-snug line-clamp-1 pr-2">
              {displayName}
            </h4>
            <span className="font-bold text-primary-600 dark:text-primary-400 whitespace-nowrap">
              ₹{price}
            </span>
          </div>
          <p className="text-xs text-dark-500 dark:text-dark-400 line-clamp-1 mt-0.5">
            Matching piece
          </p>
        </div>
        
        {/* Shopping Actions */}
        <div className="mt-4 pt-4 border-t border-dark-100 dark:border-dark-800 flex gap-2">
          <a 
            href={searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 ${platform === 'Flipkart' ? 'bg-[#2874f0] hover:bg-[#1b5bd1]' : 'bg-[#f43397] hover:bg-[#d62080]'} text-white py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]`}
          >
            <FiShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Shop on {platform}</span>
            <span className="sm:hidden">Shop</span>
          </a>
          <button
            onClick={(e) => handleDownload(e, imgSrc, displayName)}
            className="p-2.5 rounded-lg border border-dark-200 dark:border-dark-700 hover:bg-dark-50 dark:hover:bg-dark-800 text-dark-600 dark:text-dark-300 transition-colors tooltip-trigger active:scale-[0.95]"
            title="Download Image"
          >
            <FiDownload className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutfitCard;
