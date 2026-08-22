import React, { useState } from 'react';
import FavoriteButton from './FavoriteButton';
import { FiShoppingBag, FiDownload } from 'react-icons/fi';

// Keyword-specific image mapping: each item keyword maps to an image of that exact item
// This ensures the displayed image always matches the product title
const KEYWORD_IMAGES = {
  // ── Tops ──
  'tshirt':       'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=80',
  't-shirt':      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=80',
  'tee':          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=80',
  'shirt':        'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80',
  'blouse':       'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&auto=format&fit=crop&q=80',
  'polo':         'https://images.unsplash.com/photo-1625910513413-5fc42cc8a830?w=600&auto=format&fit=crop&q=80',
  'tank top':     'https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=600&auto=format&fit=crop&q=80',
  'crop top':     'https://images.unsplash.com/photo-1525171254930-643fc658b64e?w=600&auto=format&fit=crop&q=80',
  'tunic':        'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&auto=format&fit=crop&q=80',
  'camisole':     'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&auto=format&fit=crop&q=80',
  'henley':       'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&auto=format&fit=crop&q=80',

  // ── Bottoms ──
  'jeans':        'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=80',
  'denim':        'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=80',
  'trouser':      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80',
  'pant':         'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80',
  'chino':        'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&auto=format&fit=crop&q=80',
  'shorts':       'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&auto=format&fit=crop&q=80',
  'skirt':        'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&auto=format&fit=crop&q=80',
  'legging':      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&auto=format&fit=crop&q=80',
  'jogger':       'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&auto=format&fit=crop&q=80',
  'palazzo':      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80',
  'cargo':        'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=600&auto=format&fit=crop&q=80',

  // ── Outerwear ──
  'hoodie':       'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80',
  'hoody':        'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80',
  'jacket':       'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80',
  'blazer':       'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
  'coat':         'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80',
  'sweater':      'https://images.unsplash.com/photo-1434389677669-e08b4cda3a00?w=600&auto=format&fit=crop&q=80',
  'sweatshirt':   'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&auto=format&fit=crop&q=80',
  'cardigan':     'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80',
  'windbreaker':  'https://images.unsplash.com/photo-1545594861-3bef43ff2fc8?w=600&auto=format&fit=crop&q=80',
  'vest':         'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80',
  'puffer':       'https://images.unsplash.com/photo-1544923246-77307dd270b1?w=600&auto=format&fit=crop&q=80',
  'overcoat':     'https://images.unsplash.com/photo-1548624149-f7b9768865ef?w=600&auto=format&fit=crop&q=80',
  'denim jacket': 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&auto=format&fit=crop&q=80',
  'bomber':       'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80',

  // ── Full body / Dresses ──
  'dress':        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80',
  'gown':         'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&auto=format&fit=crop&q=80',
  'jumpsuit':     'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
  'romper':       'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
  'suit':         'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
  'overalls':     'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80',

  // ── Ethnic / Traditional ──
  'kurta':        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
  'saree':        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
  'sari':         'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
  'lehenga':      'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&auto=format&fit=crop&q=80',
  'sherwani':     'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&auto=format&fit=crop&q=80',
  'salwar':       'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&auto=format&fit=crop&q=80',
  'dupatta':      'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&auto=format&fit=crop&q=80',
  'anarkali':     'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&auto=format&fit=crop&q=80',
  'dhoti':        'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&auto=format&fit=crop&q=80',
  'lungi':        'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&auto=format&fit=crop&q=80',
  'nehru':        'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&auto=format&fit=crop&q=80',
  'churidar':     'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&auto=format&fit=crop&q=80',
  'ethnic':       'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',

  // ── Footwear ──
  'sneaker':      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80',
  'shoe':         'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80',
  'boot':         'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&auto=format&fit=crop&q=80',
  'sandal':       'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&auto=format&fit=crop&q=80',
  'heel':         'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80',
  'loafer':       'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&auto=format&fit=crop&q=80',
  'slipper':      'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&auto=format&fit=crop&q=80',
  'flip flop':    'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&auto=format&fit=crop&q=80',
  'oxford':       'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&auto=format&fit=crop&q=80',
  'derby':        'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&auto=format&fit=crop&q=80',
  'moccasin':     'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&auto=format&fit=crop&q=80',
  'espadrille':   'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&auto=format&fit=crop&q=80',
  'flat':         'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80',
  'wedge':        'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80',
  'pump':         'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80',
  'stiletto':     'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80',
  'ankle boot':   'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&auto=format&fit=crop&q=80',
  'chelsea boot': 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&auto=format&fit=crop&q=80',
  'running shoe': 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop&q=80',
  'trainer':      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop&q=80',
  'canvas shoe':  'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80',

  // ── Accessories ──
  'sunglasses':   'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80',
  'sunglass':     'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80',
  'eyewear':      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80',
  'glasses':      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80',
  'watch':        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
  'wristwatch':   'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
  'bag':          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
  'handbag':      'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&auto=format&fit=crop&q=80',
  'purse':        'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&auto=format&fit=crop&q=80',
  'clutch':       'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&auto=format&fit=crop&q=80',
  'backpack':     'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
  'tote':         'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&auto=format&fit=crop&q=80',
  'belt':         'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
  'scarf':        'https://images.unsplash.com/photo-1601370690183-1c7796ecec61?w=600&auto=format&fit=crop&q=80',
  'stole':        'https://images.unsplash.com/photo-1601370690183-1c7796ecec61?w=600&auto=format&fit=crop&q=80',
  'hat':          'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&auto=format&fit=crop&q=80',
  'cap':          'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&auto=format&fit=crop&q=80',
  'beanie':       'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&auto=format&fit=crop&q=80',
  'necklace':     'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80',
  'bracelet':     'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80',
  'earring':      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80',
  'jhumka':       'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80',
  'ring':         'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80',
  'jewellery':    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80',
  'jewelry':      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80',
  'pendant':      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80',
  'chain':        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80',
  'wallet':       'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
  'tie':          'https://images.unsplash.com/photo-1589756823695-278bc923a84d?w=600&auto=format&fit=crop&q=80',
  'bow tie':      'https://images.unsplash.com/photo-1589756823695-278bc923a84d?w=600&auto=format&fit=crop&q=80',
  'cufflink':     'https://images.unsplash.com/photo-1589756823695-278bc923a84d?w=600&auto=format&fit=crop&q=80',
  'brooch':       'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80',

  // ── Innerwear / Misc ──
  'bra':          'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&auto=format&fit=crop&q=80',
  'underwear':    'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&auto=format&fit=crop&q=80',
  'lingerie':     'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&auto=format&fit=crop&q=80',
  'swimwear':     'https://images.unsplash.com/photo-1570976447640-ac859083963a?w=600&auto=format&fit=crop&q=80',
  'bikini':       'https://images.unsplash.com/photo-1570976447640-ac859083963a?w=600&auto=format&fit=crop&q=80',
};

// Category-level fallback images (used only when no keyword match is found)
const CATEGORY_FALLBACKS = {
  top:        'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&auto=format&fit=crop&q=80',
  bottom:     'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=80',
  outerwear:  'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80',
  full:       'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80',
  ethnic:     'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
  footwear:   'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80',
  accessory:  'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80',
  accessories:'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80',
  clothing:   'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80',
};

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80';

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

  // Determine realistic photo URL by scanning item name for specific keywords
  // Matches the most specific (longest) keyword first to avoid partial matches
  const getImageUrl = (name, cat) => {
    const nameLower = name.toLowerCase();
    
    // Sort keywords by length descending so longer/more specific keywords match first
    // e.g. "denim jacket" matches before "jacket", "ankle boot" before "boot"
    const sortedKeywords = Object.keys(KEYWORD_IMAGES).sort((a, b) => b.length - a.length);
    
    for (const keyword of sortedKeywords) {
      if (nameLower.includes(keyword)) {
        return KEYWORD_IMAGES[keyword];
      }
    }
    
    // No keyword matched — fall back to category-level image
    return CATEGORY_FALLBACKS[cat] || FALLBACK_IMAGE;
  };

  const initialImageUrl = getImageUrl(itemName, itemCategory);
  const [imgSrc, setImgSrc] = useState(initialImageUrl);

  // Fallback image handler in case network or URL fails
  const handleImageError = () => {
    if (imgSrc !== FALLBACK_IMAGE) {
      setImgSrc(FALLBACK_IMAGE);
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
