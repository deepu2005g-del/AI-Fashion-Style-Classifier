"""
Outfit Recommendation Engine.
Provides outfit suggestions, trending data, accessories, and style explanations
based on the predicted or recommended fashion style.
"""

# ─────────────────────────────────────────────────────────────
# Complete outfit data for each style category
# ─────────────────────────────────────────────────────────────

OUTFIT_DATA = {
    "Casual": {
        "outfits": [
            {"name": "Oversized T-Shirt", "category": "top", "icon": "👕"},
            {"name": "Blue Jeans", "category": "bottom", "icon": "👖"},
            {"name": "White Sneakers", "category": "footwear", "icon": "👟"},
            {"name": "Denim Jacket", "category": "outerwear", "icon": "🧥"},
            {"name": "Chino Shorts", "category": "bottom", "icon": "🩳"},
            {"name": "Polo Shirt", "category": "top", "icon": "👕"},
            {"name": "Hoodie", "category": "outerwear", "icon": "🧥"},
            {"name": "Graphic Tee", "category": "top", "icon": "👕"},
        ],
        "accessories": [
            {"name": "Smart Watch", "icon": "⌚"},
            {"name": "Sunglasses", "icon": "🕶️"},
            {"name": "Canvas Backpack", "icon": "🎒"},
            {"name": "Baseball Cap", "icon": "🧢"},
            {"name": "Simple Chain Necklace", "icon": "📿"},
        ],
        "colors": ["Blue", "White", "Grey", "Black", "Olive", "Beige"],
        "occasions": ["College", "Shopping", "Travel", "Casual Outings", "Weekend Hangouts", "Coffee Dates"],
        "season": "Spring & Summer",
        "footwear": [
            {"name": "White Sneakers", "icon": "👟"},
            {"name": "Slip-ons", "icon": "👞"},
            {"name": "Canvas Shoes", "icon": "👟"},
            {"name": "Loafers", "icon": "👞"},
        ],
        "explanation": "Casual style is all about comfort and self-expression. It features relaxed fits, soft fabrics, and versatile pieces that can be mixed and matched effortlessly. Blue jeans, graphic tees, and sneakers form the foundation of this timeless everyday look."
    },
    "Ethnic": {
        "outfits": [
            {"name": "Kurta", "category": "top", "icon": "👘"},
            {"name": "Ethnic Jacket (Nehru)", "category": "outerwear", "icon": "🧥"},
            {"name": "Churidar", "category": "bottom", "icon": "👖"},
            {"name": "Dhoti Pants", "category": "bottom", "icon": "👖"},
            {"name": "Saree", "category": "full", "icon": "👘"},
            {"name": "Lehenga", "category": "full", "icon": "👗"},
            {"name": "Salwar Kameez", "category": "full", "icon": "👘"},
            {"name": "Sherwani", "category": "full", "icon": "🤵"},
        ],
        "accessories": [
            {"name": "Jhumka Earrings", "icon": "💎"},
            {"name": "Bangles", "icon": "💫"},
            {"name": "Maang Tikka", "icon": "👑"},
            {"name": "Brooch", "icon": "📌"},
            {"name": "Potli Bag", "icon": "👜"},
        ],
        "colors": ["Red", "Gold", "Maroon", "Green", "Royal Blue", "Orange", "Pink"],
        "occasions": ["Festivals", "Weddings", "Religious Ceremonies", "Cultural Events", "Family Gatherings", "Traditional Celebrations"],
        "season": "All Seasons (especially Festive Season)",
        "footwear": [
            {"name": "Juttis", "icon": "👞"},
            {"name": "Mojaris", "icon": "👞"},
            {"name": "Kolhapuris", "icon": "🩴"},
            {"name": "Embroidered Sandals", "icon": "👡"},
        ],
        "explanation": "Ethnic style celebrates cultural heritage through rich fabrics, intricate embroidery, and vibrant colors. From elegant kurtas to regal sherwanis, this style adds grace and tradition to any occasion. Gold accents and traditional jewelry complete the look."
    },
    "Formal": {
        "outfits": [
            {"name": "Blazer", "category": "outerwear", "icon": "🤵"},
            {"name": "Formal Shirt", "category": "top", "icon": "👔"},
            {"name": "Black Trousers", "category": "bottom", "icon": "👖"},
            {"name": "Leather Belt", "category": "accessory", "icon": "🪢"},
            {"name": "Three-Piece Suit", "category": "full", "icon": "🤵"},
            {"name": "Pencil Skirt", "category": "bottom", "icon": "👗"},
            {"name": "Vest / Waistcoat", "category": "outerwear", "icon": "🦺"},
            {"name": "Tie", "category": "accessory", "icon": "👔"},
        ],
        "accessories": [
            {"name": "Wrist Watch", "icon": "⌚"},
            {"name": "Tie", "icon": "👔"},
            {"name": "Cufflinks", "icon": "💎"},
            {"name": "Leather Briefcase", "icon": "💼"},
            {"name": "Pocket Square", "icon": "🟦"},
        ],
        "colors": ["Navy Blue", "Black", "White", "Charcoal", "Grey", "Burgundy"],
        "occasions": ["Office", "Interviews", "Business Meetings", "Formal Events", "Corporate Dinners", "Presentations"],
        "season": "All Seasons",
        "footwear": [
            {"name": "Oxford Shoes", "icon": "👞"},
            {"name": "Leather Loafers", "icon": "👞"},
            {"name": "Derby Shoes", "icon": "👞"},
            {"name": "Heels", "icon": "👠"},
        ],
        "explanation": "Formal style exudes authority, confidence, and professionalism. Structured silhouettes, premium fabrics, and muted color palettes create a polished appearance. Navy blue and black combinations are timeless and currently popular in professional settings."
    },
    "Sports": {
        "outfits": [
            {"name": "Sports T-Shirt (Dri-Fit)", "category": "top", "icon": "👕"},
            {"name": "Joggers", "category": "bottom", "icon": "👖"},
            {"name": "Running Shoes", "category": "footwear", "icon": "👟"},
            {"name": "Track Jacket", "category": "outerwear", "icon": "🧥"},
            {"name": "Compression Shorts", "category": "bottom", "icon": "🩳"},
            {"name": "Sports Bra / Tank Top", "category": "top", "icon": "🎽"},
            {"name": "Windbreaker", "category": "outerwear", "icon": "🧥"},
            {"name": "Athletic Leggings", "category": "bottom", "icon": "👖"},
        ],
        "accessories": [
            {"name": "Sports Watch", "icon": "⌚"},
            {"name": "Fitness Band", "icon": "📿"},
            {"name": "Sports Bag", "icon": "🎒"},
            {"name": "Headband", "icon": "🎀"},
            {"name": "Water Bottle", "icon": "🫗"},
        ],
        "colors": ["Black", "Neon Green", "Electric Blue", "Red", "White", "Orange"],
        "occasions": ["Gym", "Running", "Sports Events", "Outdoor Activities", "Hiking", "Yoga"],
        "season": "All Seasons",
        "footwear": [
            {"name": "Running Shoes", "icon": "👟"},
            {"name": "Training Shoes", "icon": "👟"},
            {"name": "Hiking Boots", "icon": "🥾"},
            {"name": "Sport Sandals", "icon": "🩴"},
        ],
        "explanation": "Sports style prioritizes performance, comfort, and functionality. Moisture-wicking fabrics, ergonomic designs, and vibrant colors define this energetic look. Whether hitting the gym or going for a run, the right sportswear enhances both performance and confidence."
    }
}


# ─────────────────────────────────────────────────────────────
# Trending fashion data
# ─────────────────────────────────────────────────────────────

TRENDING_DATA = {
    "styles": [
        {
            "name": "Streetwear Fusion",
            "description": "A blend of casual streetwear with high-fashion elements. Think oversized hoodies paired with tailored trousers.",
            "category": "Casual",
            "popularity": 95,
            "icon": "🔥"
        },
        {
            "name": "Neo-Traditional",
            "description": "Modern silhouettes with traditional fabrics and prints. Contemporary kurtas with minimalist cuts.",
            "category": "Ethnic",
            "popularity": 88,
            "icon": "✨"
        },
        {
            "name": "Power Casual",
            "description": "Blazers over T-shirts, smart-casual looks that bridge the gap between formal and relaxed.",
            "category": "Formal",
            "popularity": 91,
            "icon": "💼"
        },
        {
            "name": "Athleisure",
            "description": "Performance wear that transitions from gym to street. Sleek joggers with premium sneakers.",
            "category": "Sports",
            "popularity": 93,
            "icon": "🏃"
        },
        {
            "name": "Minimalist Chic",
            "description": "Clean lines, neutral tones, and thoughtful details. Less is more with quality fabrics.",
            "category": "Casual",
            "popularity": 89,
            "icon": "🤍"
        },
        {
            "name": "Sustainable Fashion",
            "description": "Eco-friendly fabrics, upcycled materials, and timeless pieces that reduce fashion waste.",
            "category": "Casual",
            "popularity": 87,
            "icon": "🌿"
        },
    ],
    "colors": [
        {"name": "Lavender", "hex": "#E6E6FA", "popularity": 92},
        {"name": "Sage Green", "hex": "#9DC183", "popularity": 90},
        {"name": "Butter Yellow", "hex": "#FFFACD", "popularity": 85},
        {"name": "Dusty Rose", "hex": "#DCAE96", "popularity": 88},
        {"name": "Classic Navy", "hex": "#1B3A5C", "popularity": 94},
        {"name": "Terracotta", "hex": "#E2725B", "popularity": 83},
        {"name": "Powder Blue", "hex": "#B0E0E6", "popularity": 86},
        {"name": "Charcoal", "hex": "#36454F", "popularity": 91},
    ],
    "accessories": [
        {"name": "Chunky Gold Chain", "category": "Jewelry", "popularity": 90, "icon": "📿"},
        {"name": "Mini Crossbody Bag", "category": "Bags", "popularity": 93, "icon": "👜"},
        {"name": "Retro Sunglasses", "category": "Eyewear", "popularity": 88, "icon": "🕶️"},
        {"name": "Smart Watch", "category": "Tech", "popularity": 95, "icon": "⌚"},
        {"name": "Silk Scarf", "category": "Accessories", "popularity": 82, "icon": "🧣"},
        {"name": "Statement Rings", "category": "Jewelry", "popularity": 85, "icon": "💍"},
    ],
    "seasonal": {
        "Summer": {
            "description": "Light fabrics, breathable materials, and vibrant prints dominate the summer scene.",
            "must_haves": ["Linen Shirts", "Cotton Shorts", "Straw Hats", "Slide Sandals"],
            "icon": "☀️"
        },
        "Winter": {
            "description": "Layering is key with cozy knits, structured coats, and rich textures.",
            "must_haves": ["Wool Overcoat", "Cashmere Sweater", "Leather Boots", "Knit Scarves"],
            "icon": "❄️"
        },
        "Spring": {
            "description": "Fresh pastels, floral prints, and transitional layering pieces.",
            "must_haves": ["Trench Coat", "Floral Dress", "Light Sneakers", "Denim Jacket"],
            "icon": "🌸"
        },
        "Monsoon": {
            "description": "Water-resistant materials, quick-dry fabrics, and practical yet stylish choices.",
            "must_haves": ["Waterproof Jacket", "Quick-dry Shoes", "Umbrella", "Short Boots"],
            "icon": "🌧️"
        },
    }
}


import random

def get_outfit_suggestions(style, gender="Unisex", item_type="Top"):
    """
    Get complete outfit suggestions for a given fashion style.
    
    Args:
        style (str): One of 'Casual', 'Ethnic', 'Formal', 'Sports'.
        gender (str): Men, Women, or Unisex.
        item_type (str): Top, Bottom, Full, Footwear
        
    Returns:
        dict: Complete suggestion data including outfits, accessories,
              colors, occasions, season, footwear, and explanation.
    """
    style = style.strip().title()
    
    if style not in OUTFIT_DATA:
        # Fallback to Casual
        style = "Casual"
    
    data = OUTFIT_DATA[style]
    
    # Complementary Matching Logic
    # If user uploads a Bottom, we want to suggest Tops, Full, or Outerwear
    # If user uploads a Top, we want to suggest Bottoms, Full, or Outerwear
    # If user uploads Footwear, we suggest clothing
    all_outfits = data["outfits"]
    complementary_outfits = []
    
    item_type = item_type.lower()
    for item in all_outfits:
        # Avoid recommending the exact same category they uploaded, unless it's a full outfit
        if item_type == "bottom" and item["category"] == "bottom":
            continue
        if item_type == "top" and item["category"] == "top":
            continue
        complementary_outfits.append(item)
        
    # If we filtered too aggressively (e.g., they uploaded something we don't have complements for), 
    # fallback to all outfits
    if len(complementary_outfits) < 2:
        complementary_outfits = all_outfits

    # Apply gender prefix to names for more accurate AI images
    gender_prefix = ""
    if gender.lower() == "men":
        gender_prefix = "Men's "
    elif gender.lower() == "women":
        gender_prefix = "Women's "
    
    # Format the names in the lists
    formatted_outfits = []
    for item in complementary_outfits:
        new_item = item.copy()
        new_item["name"] = f"{gender_prefix}{item['name']}"
        formatted_outfits.append(new_item)
        
    formatted_accessories = []
    for item in data["accessories"]:
        new_item = item.copy()
        new_item["name"] = f"{gender_prefix}{item['name']}"
        formatted_accessories.append(new_item)
        
    formatted_footwear = []
    for item in data["footwear"]:
        new_item = item.copy()
        new_item["name"] = f"{gender_prefix}{item['name']}"
        formatted_footwear.append(new_item)

    # Shuffle and pick subsets so suggestions vary
    final_outfits = random.sample(formatted_outfits, min(4, len(formatted_outfits)))
    final_accessories = random.sample(formatted_accessories, min(3, len(formatted_accessories)))
    final_footwear = random.sample(formatted_footwear, min(2, len(formatted_footwear)))
    
    return {
        "outfits": [item["name"] for item in final_outfits],
        "outfit_details": final_outfits,
        "accessories": [item["name"] for item in final_accessories],
        "accessory_details": final_accessories,
        "colors": data["colors"],
        "occasions": data["occasions"],
        "season": data["season"],
        "footwear": [item["name"] for item in final_footwear],
        "footwear_details": final_footwear,
        "explanation": data["explanation"],
    }


def get_style_explanation(style, confidence=None):
    """
    Generate a detailed, readable explanation for a predicted/recommended style.
    
    Args:
        style (str): The predicted fashion style.
        confidence (float, optional): Confidence percentage.
        
    Returns:
        str: A human-readable explanation.
    """
    style = style.strip().title()
    
    explanations = {
        "Casual": (
            "This outfit is classified as Casual because of its relaxed fit, "
            "comfortable fabrics, and everyday-friendly design. Casual wear "
            "emphasizes self-expression and comfort, making it perfect for "
            "daily activities, outings, and informal gatherings."
        ),
        "Ethnic": (
            "This outfit is classified as Ethnic because of its traditional "
            "design elements, rich fabrics, and cultural patterns. Ethnic wear "
            "celebrates heritage with intricate details like embroidery, "
            "vibrant colors, and classic silhouettes."
        ),
        "Formal": (
            "This outfit is classified as Formal because of its structured "
            "silhouette, dark color palette, and tailored appearance. Formal "
            "wear conveys professionalism and authority, ideal for business "
            "settings, interviews, and upscale events."
        ),
        "Sports": (
            "This outfit is classified as Sports because of its athletic "
            "design, performance-oriented materials, and functional features. "
            "Sportswear combines comfort with technology for optimal "
            "performance during physical activities."
        ),
    }
    
    explanation = explanations.get(style, f"This outfit has been classified as {style}.")
    
    if confidence is not None and confidence > 85:
        explanation += f" The model is highly confident ({confidence:.1f}%) in this classification."
    
    return explanation


def get_trending():
    """
    Get all trending fashion data.
    
    Returns:
        dict: Trending styles, colors, accessories, and seasonal data.
    """
    return TRENDING_DATA
