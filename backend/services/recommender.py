"""
Style Recommender Service.
Provides quiz-based style recommendations using a weighted scoring system.
Analyzes user preferences across multiple dimensions to suggest the best fashion style.
"""

import logging

logger = logging.getLogger(__name__)


# ─────────────────────────────────────────────────────────────
# Scoring weights for each quiz answer → style contribution
# Each answer maps to points added to: {Casual, Ethnic, Formal, Sports}
# ─────────────────────────────────────────────────────────────

SCORING_RULES = {
    "gender": {
        "male":   {"Casual": 2, "Ethnic": 2, "Formal": 2, "Sports": 2},
        "female": {"Casual": 2, "Ethnic": 3, "Formal": 2, "Sports": 1},
        "non-binary": {"Casual": 3, "Ethnic": 1, "Formal": 2, "Sports": 2},
    },
    "age_group": {
        "under-18":  {"Casual": 4, "Ethnic": 1, "Formal": 0, "Sports": 3},
        "18-25":     {"Casual": 4, "Ethnic": 2, "Formal": 1, "Sports": 3},
        "26-35":     {"Casual": 3, "Ethnic": 2, "Formal": 3, "Sports": 2},
        "36-50":     {"Casual": 2, "Ethnic": 3, "Formal": 4, "Sports": 1},
        "50+":       {"Casual": 2, "Ethnic": 4, "Formal": 3, "Sports": 0},
    },
    "occupation": {
        "student":       {"Casual": 5, "Ethnic": 1, "Formal": 0, "Sports": 3},
        "professional":  {"Casual": 1, "Ethnic": 1, "Formal": 5, "Sports": 1},
        "freelancer":    {"Casual": 4, "Ethnic": 2, "Formal": 1, "Sports": 2},
        "entrepreneur":  {"Casual": 2, "Ethnic": 2, "Formal": 4, "Sports": 1},
        "artist":        {"Casual": 3, "Ethnic": 4, "Formal": 0, "Sports": 1},
        "homemaker":     {"Casual": 3, "Ethnic": 4, "Formal": 1, "Sports": 1},
        "retired":       {"Casual": 3, "Ethnic": 4, "Formal": 2, "Sports": 1},
        "athlete":       {"Casual": 1, "Ethnic": 0, "Formal": 0, "Sports": 5},
        "other":         {"Casual": 3, "Ethnic": 2, "Formal": 2, "Sports": 2},
    },
    "lifestyle": {
        "active":     {"Casual": 2, "Ethnic": 0, "Formal": 0, "Sports": 5},
        "moderate":   {"Casual": 3, "Ethnic": 2, "Formal": 2, "Sports": 2},
        "relaxed":    {"Casual": 5, "Ethnic": 3, "Formal": 0, "Sports": 0},
        "busy":       {"Casual": 2, "Ethnic": 1, "Formal": 4, "Sports": 1},
    },
    "comfort": {
        "very-comfortable":  {"Casual": 5, "Ethnic": 2, "Formal": 0, "Sports": 4},
        "comfortable":       {"Casual": 4, "Ethnic": 3, "Formal": 1, "Sports": 3},
        "balanced":          {"Casual": 2, "Ethnic": 2, "Formal": 3, "Sports": 2},
        "stylish":           {"Casual": 1, "Ethnic": 3, "Formal": 4, "Sports": 0},
        "very-stylish":      {"Casual": 0, "Ethnic": 4, "Formal": 5, "Sports": 0},
    },
    "colors": {
        "neutral":   {"Casual": 3, "Ethnic": 2, "Formal": 4, "Sports": 1},
        "bright":    {"Casual": 3, "Ethnic": 4, "Formal": 0, "Sports": 3},
        "dark":      {"Casual": 2, "Ethnic": 1, "Formal": 5, "Sports": 2},
        "pastel":    {"Casual": 4, "Ethnic": 3, "Formal": 1, "Sports": 1},
        "vibrant":   {"Casual": 2, "Ethnic": 5, "Formal": 0, "Sports": 3},
        "earth":     {"Casual": 3, "Ethnic": 4, "Formal": 2, "Sports": 1},
    },
    "occasion": {
        "daily":       {"Casual": 5, "Ethnic": 1, "Formal": 0, "Sports": 2},
        "work":        {"Casual": 1, "Ethnic": 1, "Formal": 5, "Sports": 0},
        "party":       {"Casual": 2, "Ethnic": 3, "Formal": 3, "Sports": 0},
        "sports":      {"Casual": 0, "Ethnic": 0, "Formal": 0, "Sports": 5},
        "festivals":   {"Casual": 1, "Ethnic": 5, "Formal": 1, "Sports": 0},
        "travel":      {"Casual": 4, "Ethnic": 1, "Formal": 0, "Sports": 3},
        "mixed":       {"Casual": 3, "Ethnic": 2, "Formal": 2, "Sports": 2},
    },
    "clothing_type": {
        "t-shirts":    {"Casual": 5, "Ethnic": 0, "Formal": 0, "Sports": 3},
        "shirts":      {"Casual": 2, "Ethnic": 1, "Formal": 4, "Sports": 0},
        "kurtas":      {"Casual": 0, "Ethnic": 5, "Formal": 1, "Sports": 0},
        "suits":       {"Casual": 0, "Ethnic": 1, "Formal": 5, "Sports": 0},
        "sportswear":  {"Casual": 1, "Ethnic": 0, "Formal": 0, "Sports": 5},
        "dresses":     {"Casual": 3, "Ethnic": 3, "Formal": 3, "Sports": 0},
        "jeans":       {"Casual": 5, "Ethnic": 0, "Formal": 0, "Sports": 2},
        "mixed":       {"Casual": 3, "Ethnic": 2, "Formal": 2, "Sports": 2},
    },
    "climate": {
        "hot":        {"Casual": 4, "Ethnic": 3, "Formal": 1, "Sports": 3},
        "cold":       {"Casual": 2, "Ethnic": 2, "Formal": 4, "Sports": 1},
        "moderate":   {"Casual": 3, "Ethnic": 3, "Formal": 3, "Sports": 3},
        "tropical":   {"Casual": 4, "Ethnic": 4, "Formal": 0, "Sports": 2},
        "varied":     {"Casual": 3, "Ethnic": 2, "Formal": 3, "Sports": 2},
    },
    "budget": {
        "budget":     {"Casual": 4, "Ethnic": 2, "Formal": 0, "Sports": 3},
        "mid-range":  {"Casual": 3, "Ethnic": 3, "Formal": 2, "Sports": 2},
        "premium":    {"Casual": 1, "Ethnic": 3, "Formal": 4, "Sports": 2},
        "luxury":     {"Casual": 0, "Ethnic": 3, "Formal": 5, "Sports": 1},
    },
}


# ─────────────────────────────────────────────────────────────
# Reason templates for each style
# ─────────────────────────────────────────────────────────────

REASON_TEMPLATES = {
    "Casual": [
        "You prefer comfort and a relaxed approach to dressing",
        "your lifestyle leans towards easy-going and practical fashion choices",
        "Casual style matches your everyday needs perfectly",
    ],
    "Ethnic": [
        "You appreciate traditional aesthetics and cultural fashion",
        "your color preferences and occasion needs align with ethnic wear",
        "Ethnic style reflects your personality and cultural connection",
    ],
    "Formal": [
        "You value structure, professionalism, and polished appearances",
        "your work environment and lifestyle demand a refined wardrobe",
        "Formal style complements your professional aspirations",
    ],
    "Sports": [
        "You lead an active lifestyle and prioritize functionality",
        "comfort and mobility are your top priorities in clothing",
        "Sports style supports your energetic and health-conscious lifestyle",
    ],
}

# Additional context fragments based on specific answers
CONTEXT_FRAGMENTS = {
    "occupation": {
        "student": "As a student, you need versatile clothing that transitions between classes and social activities.",
        "professional": "Your professional environment calls for polished, well-structured outfits.",
        "freelancer": "Your flexible work style allows you to express yourself freely through fashion.",
        "entrepreneur": "Your entrepreneurial lifestyle requires outfits that are both sharp and comfortable.",
        "artist": "Your creative spirit is best expressed through unique and culturally rich fashion.",
        "athlete": "Your athletic lifestyle demands high-performance, functional clothing.",
    },
    "lifestyle": {
        "active": "Your active routine benefits from clothes that offer comfort and freedom of movement.",
        "relaxed": "Your laid-back approach to life is best complemented by comfortable, no-fuss clothing.",
        "busy": "Your packed schedule needs a wardrobe that looks put-together with minimal effort.",
    },
    "age_group": {
        "under-18": "At your age, experimenting with different styles is the best way to discover your fashion identity.",
        "18-25": "This is the perfect age to build a versatile wardrobe that expresses your personal style.",
        "26-35": "You're at an age where investing in quality, timeless pieces pays off.",
        "36-50": "Your experience helps you understand what works best for you — lean into that confidence.",
    },
}


def recommend_style(answers):
    """
    Recommend a fashion style based on quiz answers using a weighted scoring system.
    
    Args:
        answers (dict): Dictionary of quiz answers. Expected keys:
            - gender, age_group, occupation, lifestyle, comfort,
            - colors, occasion, clothing_type, climate, budget
    
    Returns:
        dict: {
            "recommended_style": str,
            "suitability": int (0-100),
            "reason": str,
            "alternatives": list[dict] with {style, suitability}
        }
    """
    # Initialize scores for all styles
    scores = {"Casual": 0, "Ethnic": 0, "Formal": 0, "Sports": 0}
    
    # Calculate scores from each answer
    for question, answer in answers.items():
        question = question.lower().strip()
        answer_key = answer.lower().strip() if isinstance(answer, str) else str(answer).lower()
        
        if question in SCORING_RULES and answer_key in SCORING_RULES[question]:
            weights = SCORING_RULES[question][answer_key]
            for style, weight in weights.items():
                scores[style] += weight
    
    # Calculate total score for percentage conversion
    total_score = sum(scores.values())
    
    if total_score == 0:
        # Fallback if no valid answers matched
        return {
            "recommended_style": "Casual",
            "suitability": 50,
            "reason": "We couldn't determine a strong preference from your answers. Casual is a great starting point!",
            "alternatives": [
                {"style": "Sports", "suitability": 40},
                {"style": "Ethnic", "suitability": 30},
                {"style": "Formal", "suitability": 30},
            ]
        }
    
    # Sort styles by score (highest first)
    sorted_styles = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    
    # Convert scores to suitability percentages (relative to the top score)
    max_score = sorted_styles[0][1]
    suitability_map = {}
    for style, score in sorted_styles:
        # Scale to percentage: top style gets a score between 80-98
        # Others proportionally lower
        if max_score > 0:
            raw_pct = (score / max_score) * 100
            # Apply scaling so top is 85-98% and differences are meaningful
            suitability_map[style] = max(10, min(98, int(raw_pct * 0.98)))
        else:
            suitability_map[style] = 25
    
    recommended_style = sorted_styles[0][0]
    suitability = suitability_map[recommended_style]
    
    # Build reason text
    reason = _generate_reason(recommended_style, answers)
    
    # Build alternatives list (excluding the recommended style)
    alternatives = []
    for style, _score in sorted_styles[1:]:
        alternatives.append({
            "style": style,
            "suitability": suitability_map[style]
        })
    
    logger.info(f"Style recommendation: {recommended_style} ({suitability}%)")
    logger.info(f"Scores: {scores}")
    
    return {
        "recommended_style": recommended_style,
        "suitability": suitability,
        "reason": reason,
        "alternatives": alternatives
    }


def _generate_reason(style, answers):
    """
    Generate a human-readable explanation for the style recommendation.
    
    Args:
        style (str): The recommended style name.
        answers (dict): The quiz answers.
        
    Returns:
        str: A natural language explanation.
    """
    parts = []
    
    # Add main reason template
    if style in REASON_TEMPLATES:
        parts.append(REASON_TEMPLATES[style][0])
    
    # Add specific context based on answers
    occupation = answers.get("occupation", "").lower()
    if occupation in CONTEXT_FRAGMENTS.get("occupation", {}):
        parts.append(CONTEXT_FRAGMENTS["occupation"][occupation])
    
    lifestyle = answers.get("lifestyle", "").lower()
    if lifestyle in CONTEXT_FRAGMENTS.get("lifestyle", {}):
        parts.append(CONTEXT_FRAGMENTS["lifestyle"][lifestyle])
    
    age_group = answers.get("age_group", "").lower()
    if age_group in CONTEXT_FRAGMENTS.get("age_group", {}):
        parts.append(CONTEXT_FRAGMENTS["age_group"][age_group])
    
    # Combine into flowing text
    if len(parts) >= 2:
        reason = f"{parts[0]}. {parts[1]}"
        if len(parts) >= 3:
            reason += f" {parts[2]}"
    elif parts:
        reason = parts[0] + "."
    else:
        reason = f"{style} style is a great match for your preferences."
    
    return reason
