import React from 'react';
import FavoriteButton from './FavoriteButton';
import { FiExternalLink, FiShoppingBag } from 'react-icons/fi';

const OutfitCard = ({ item, category }) => {
  const itemName = item?.name || item || 'Clothing Item';
  const itemIcon = item?.icon || '👕';
  const itemCategory = item?.category || category || 'clothing';

  // Function to get a realistic shopping image based on item name and category
  const getImageUrl = (name, cat) => {
    const term = `${name} ${cat}`.toLowerCase();
    
    // Tops
    if (term.includes('t-shirt') || term.includes('tee')) return 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80';
    if (term.includes('shirt') || term.includes('polo')) return 'https://images.unsplash.com/photo-1596755094514-f87e32f85e23?w=500&q=80';
    if (term.includes('kurta')) return 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80';
    if (term.includes('hoodie') || term.includes('sweat')) return 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80';
    if (term.includes('top') || term.includes('bra')) return 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=500&q=80';
    
    // Bottoms
    if (term.includes('jeans') || term.includes('denim')) return 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80';
    if (term.includes('pants') || term.includes('trouser') || term.includes('churidar') || term.includes('jogger')) return 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&q=80';
    if (term.includes('shorts')) return 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&q=80';
    if (term.includes('skirt')) return 'https://images.unsplash.com/photo-1583496924827-0db79f649de1?w=500&q=80';
    if (term.includes('leggings')) return 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&q=80';
    
    // Outerwear & Full
    if (term.includes('jacket') || term.includes('blazer') || term.includes('coat')) return 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80';
    if (term.includes('suit') || term.includes('sherwani') || term.includes('waistcoat')) return 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&q=80';
    if (term.includes('saree') || term.includes('lehenga') || term.includes('dress') || term.includes('salwar')) return 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80';
    
    // Footwear
    if (term.includes('sneaker') || term.includes('shoe')) return 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80';
    if (term.includes('boot')) return 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500&q=80';
    if (term.includes('heel') || term.includes('sandal')) return 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80';
    if (term.includes('loafer') || term.includes('oxford')) return 'https://images.unsplash.com/photo-1614252232525-a111a68d7162?w=500&q=80';
    
    // Accessories
    if (term.includes('watch') || term.includes('band')) return 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&q=80';
    if (term.includes('glass')) return 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80';
    if (term.includes('bag')) return 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=500&q=80';
    if (term.includes('belt')) return 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80';
    if (term.includes('tie')) return 'https://images.unsplash.com/photo-1599839619722-39751411ea63?w=500&q=80';
    if (term.includes('earring') || term.includes('bangle') || term.includes('jewelry')) return 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80';
    if (term.includes('cap') || term.includes('hat')) return 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&q=80';
    
    // Default fallback - generic fashion aesthetic
    return 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&q=80';
  };

  const imageUrl = getImageUrl(itemName, itemCategory);

  // Generate a realistic but stable random price for the demo
  const generatePrice = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const price = 24 + (Math.abs(hash) % 150) + 0.99;
    return price.toFixed(2);
  };
  
  const price = generatePrice(itemName);

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
      </div>

      {/* Product Details Area */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-1">
            <h4 className="font-heading font-bold text-dark-800 dark:text-dark-100 text-base leading-snug line-clamp-1 pr-2">
              {itemName}
            </h4>
            <span className="font-bold text-primary-600 dark:text-primary-400 whitespace-nowrap">
              ${price}
            </span>
          </div>
          <p className="text-xs text-dark-500 dark:text-dark-400 line-clamp-1 mt-0.5">
            Recommended match for this style
          </p>
        </div>
        
        {/* Shopping Actions */}
        <div className="mt-4 pt-4 border-t border-dark-100 dark:border-dark-800 flex gap-2">
          <button className="flex-1 bg-dark-900 hover:bg-black dark:bg-white dark:hover:bg-dark-50 dark:text-dark-900 text-white py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]">
            <FiShoppingBag className="w-4 h-4" />
            <span>Shop Now</span>
          </button>
          <button className="p-2.5 rounded-lg border border-dark-200 dark:border-dark-700 hover:bg-dark-50 dark:hover:bg-dark-800 text-dark-600 dark:text-dark-300 transition-colors tooltip-trigger active:scale-[0.95]" title="Find Similar on web">
            <FiExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutfitCard;
