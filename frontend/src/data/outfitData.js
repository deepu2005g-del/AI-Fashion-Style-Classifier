export const FALLBACK_OUTFITS = {
  Casual: {
    outfits: [
      { name: "Oversized T-Shirt", category: "top", icon: "👕" },
      { name: "Blue Jeans", category: "bottom", icon: "👖" },
      { name: "White Sneakers", category: "footwear", icon: "👟" },
      { name: "Denim Jacket", category: "outerwear", icon: "🧥" }
    ],
    accessories: [
      { name: "Smart Watch", icon: "⌚" },
      { name: "Sunglasses", icon: "🕶️" },
      { name: "Canvas Backpack", icon: "🎒" }
    ],
    colors: ["Blue", "White", "Grey", "Black", "Olive"],
    occasions: ["College", "Shopping", "Travel", "Casual Outings"],
    season: "Spring & Summer",
    footwear: ["White Sneakers", "Slip-ons", "Canvas Shoes"],
    explanation: "Casual style is all about comfort and self-expression. It features relaxed fits, soft fabrics, and versatile pieces that can be mixed and matched effortlessly."
  },
  Ethnic: {
    outfits: [
      { name: "Kurta", category: "top", icon: "👘" },
      { name: "Ethnic Jacket (Nehru)", category: "outerwear", icon: "🧥" },
      { name: "Churidar", category: "bottom", icon: "👖" },
      { name: "Salwar Kameez", category: "full", icon: "👘" }
    ],
    accessories: [
      { name: "Jhumka Earrings", icon: "💎" },
      { name: "Bangles", icon: "💫" },
      { name: "Potli Bag", icon: "👜" }
    ],
    colors: ["Red", "Gold", "Maroon", "Green", "Royal Blue"],
    occasions: ["Festivals", "Weddings", "Family Gatherings"],
    season: "Festive Season",
    footwear: ["Juttis", "Mojaris", "Kolhapuris"],
    explanation: "Ethnic style celebrates cultural heritage through rich fabrics, intricate embroidery, and vibrant colors."
  },
  Formal: {
    outfits: [
      { name: "Blazer", category: "outerwear", icon: "🤵" },
      { name: "Formal Shirt", category: "top", icon: "👔" },
      { name: "Black Trousers", category: "bottom", icon: "👖" },
      { name: "Tie", category: "accessory", icon: "👔" }
    ],
    accessories: [
      { name: "Wrist Watch", icon: "⌚" },
      { name: "Cufflinks", icon: "💎" },
      { name: "Leather Briefcase", icon: "💼" }
    ],
    colors: ["Navy Blue", "Black", "White", "Charcoal", "Burgundy"],
    occasions: ["Office", "Interviews", "Business Meetings"],
    season: "All Seasons",
    footwear: ["Oxford Shoes", "Leather Loafers", "Derby Shoes"],
    explanation: "Formal style exudes authority, confidence, and professionalism. Structured silhouettes, premium fabrics, and muted color palettes create a polished appearance."
  },
  Sports: {
    outfits: [
      { name: "Sports T-Shirt (Dri-Fit)", category: "top", icon: "👕" },
      { name: "Joggers", "category": "bottom", "icon": "👖" },
      { name: "Running Shoes", "category": "footwear", "icon": "👟" },
      { name: "Track Jacket", "category": "outerwear", "icon": "🧥" }
    ],
    accessories: [
      { name: "Sports Watch", icon: "⌚" },
      { name: "Sports Bag", icon: "🎒" },
      { name: "Water Bottle", icon: "🫗" }
    ],
    colors: ["Black", "Neon Green", "Electric Blue", "Red", "White"],
    occasions: ["Gym", "Running", "Sports Events", "Outdoor Activities"],
    season: "All Seasons",
    footwear: ["Running Shoes", "Training Shoes", "Sport Sandals"],
    explanation: "Sports style prioritizes performance, comfort, and functionality. Moisture-wicking fabrics and ergonomic designs define this energetic look."
  }
};

export const QUIZ_QUESTIONS = [
  {
    id: "gender",
    question: "Select your gender preference:",
    options: [
      { value: "male", label: "Male / Masculine Style" },
      { value: "female", label: "Female / Feminine Style" },
      { value: "non-binary", label: "Non-binary / Neutral Style" }
    ]
  },
  {
    id: "age_group",
    question: "Which age group do you fall into?",
    options: [
      { value: "under-18", label: "Under 18" },
      { value: "18-25", label: "18 - 25" },
      { value: "26-35", label: "26 - 35" },
      { value: "36-50", label: "36 - 50" },
      { value: "50+", label: "50 and above" }
    ]
  },
  {
    id: "occupation",
    question: "What is your main daily occupation?",
    options: [
      { value: "student", label: "Student" },
      { value: "professional", label: "Corporate Professional" },
      { value: "freelancer", label: "Freelancer / Creative" },
      { value: "entrepreneur", label: "Business Owner / Entrepreneur" },
      { value: "athlete", label: "Athlete / Fitness Trainer" },
      { value: "other", label: "Other / Multitasking" }
    ]
  },
  {
    id: "lifestyle",
    question: "Describe your daily lifestyle pace:",
    options: [
      { value: "active", label: "Highly Active (Always on the move)" },
      { value: "moderate", label: "Balanced (Mix of work, rest, play)" },
      { value: "relaxed", label: "Relaxed (Comfort-focused, low stress)" },
      { value: "busy", label: "Fast-paced (Meetings, networking, tight schedule)" }
    ]
  },
  {
    id: "comfort",
    question: "How important is physical comfort in your dressing?",
    options: [
      { value: "very-comfortable", label: "Absolute Priority (Will choose sweatpants over style)" },
      { value: "comfortable", label: "Highly Important (Must feel comfortable, but look good)" },
      { value: "balanced", label: "Moderate (Willing to sacrifice a bit of comfort for style)" },
      { value: "very-stylish", label: "Aesthetics First (Style is everything, comfort is secondary)" }
    ]
  },
  {
    id: "colors",
    question: "What color palettes are you naturally drawn to?",
    options: [
      { value: "neutral", label: "Neutral & Muted (Beige, Grey, Navy, White, Black)" },
      { value: "dark", label: "Dark & Elegant (Black, Charcoal, Dark Burgundy)" },
      { value: "bright", label: "Bright & Energetic (Red, Orange, Yellow, Neons)" },
      { value: "pastel", label: "Pastels & Soft Tones (Lavender, Mint, Dusty Pink)" },
      { value: "vibrant", label: "Rich & Traditional (Gold, Royal Blue, Emerald Green)" }
    ]
  },
  {
    id: "occasion",
    question: "Where will you wear this recommended style most?",
    options: [
      { value: "daily", label: "Everyday wear (Hangouts, simple chores)" },
      { value: "work", label: "Formal environments (Meetings, offices)" },
      { value: "party", label: "Social events & Parties" },
      { value: "festivals", label: "Weddings & Traditional festivals" },
      { value: "sports", label: "Gym & Sports activities" }
    ]
  },
  {
    id: "clothing_type",
    question: "What is your absolute favorite clothing piece?",
    options: [
      { value: "t-shirts", label: "Oversized Tees / Hoodies" },
      { value: "shirts", label: "Collared Shirts / Polos" },
      { value: "kurtas", label: "Traditional Kurtas / Sarees" },
      { value: "suits", label: "Structured Blazers / Suits" },
      { value: "sportswear", label: "Activewear / Track jackets" }
    ]
  },
  {
    id: "climate",
    question: "What is the typical climate you live in?",
    options: [
      { value: "hot", label: "Hot & Humid" },
      { value: "cold", label: "Cold & Breezy" },
      { value: "moderate", label: "Temperate / Moderate" },
      { value: "tropical", label: "Tropical (Varying monsoon/sun)" }
    ]
  },
  {
    id: "budget",
    question: "Choose your primary budget style preference:",
    options: [
      { value: "budget", label: "Affordable & Budget-friendly" },
      { value: "mid-range", label: "Mid-range Quality Staples" },
      { value: "premium", label: "Premium / Brand-focused" },
      { value: "luxury", label: "High-end Luxury Pieces" }
    ]
  }
];
