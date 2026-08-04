import React, { useMemo } from 'react';
import FavoriteButton from './FavoriteButton';
import { FiExternalLink, FiShoppingBag, FiDownload } from 'react-icons/fi';

const OutfitCard = ({ item, category, activeFilter }) => {
  const itemName = item?.name || item || 'Clothing Item';
  const itemIcon = item?.icon || '👕';
  const itemCategory = item?.category || category || 'clothing';

  // Generate a stable random seed for this specific card instance so the image doesn't flicker on re-renders
  const seed = useMemo(() => Math.floor(Math.random() * 1000000), []);

  // Function to get a realistic shopping image based on item name, category, and active filter
  const getImageUrl = (name, cat, filter) => {
    const prompt = filter 
      ? `${filter} ${name} fashion photography highly detailed realistic clothing`
      : `${name} ${cat} fashion photography highly detailed realistic clothing`;
      
    // Use Pollinations AI image generation for accurate, dynamic images
    return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=500&height=500&nologo=true&seed=${seed}`;
  };

  const imageUrl = getImageUrl(itemName, itemCategory, activeFilter);
  
  // Determine the platform (Flipkart or Meesho) deterministically based on item name
  const getPlatform = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % 2 === 0 ? 'Flipkart' : 'Meesho';
  };
  
  const platform = getPlatform(itemName);
  
  // Construct search URL for online shopping
  const getSearchUrl = (name, cat, platform, filter) => {
    const queryTerm = filter ? `${filter} ${name} ${cat}` : `${name} ${cat}`;
    const query = encodeURIComponent(queryTerm);
    if (platform === 'Flipkart') {
      return `https://www.flipkart.com/search?q=${query}`;
    } else {
      return `https://www.meesho.com/search?q=${query}`;
    }
  };
  
  const searchUrl = getSearchUrl(itemName, itemCategory, platform, activeFilter);

  // Generate a realistic but stable random price for the demo (in INR for Indian stores)
  const generatePrice = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const price = 299 + (Math.abs(hash) % 2000);
    return price.toString();
  };
  
  const price = generatePrice(itemName);

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
      console.error("Error downloading image:", error);
      // Fallback
      window.open(url, '_blank');
    }
  };

  return (
    <div className="glass-card-hover overflow-hidden flex flex-col group h-full bg-white dark:bg-dark-900 shadow-sm border border-dark-100 dark:border-dark-800 rounded-xl relative">
      {/* Product Image Area */}
      <div className="relative h-56 w-full overflow-hidden bg-dark-50 dark:bg-dark-950">
        <img 
          src={imageUrl} 
          alt={itemName}
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
              {activeFilter ? `${activeFilter} ${itemName}` : itemName}
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
            onClick={(e) => handleDownload(e, imageUrl, activeFilter ? `${activeFilter} ${itemName}` : itemName)}
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
