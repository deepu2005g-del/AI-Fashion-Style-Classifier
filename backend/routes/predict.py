"""
API Routes for the Fashion AI Assistant.
Provides endpoints for image-based style prediction and quiz-based style recommendation.
"""

import os
import uuid
import logging
from flask import Blueprint, request, jsonify, current_app

from services.classifier import predict, load_model
from services.recommender import recommend_style
from services.outfit_engine import get_outfit_suggestions, get_style_explanation, get_trending
from utils.image_utils import validate_image, preprocess_image

logger = logging.getLogger(__name__)

# Create Blueprint for prediction routes
predict_bp = Blueprint('predict', __name__)


@predict_bp.route('/predict', methods=['POST'])
def predict_style():
    """
    POST /predict
    
    Accepts an image file and returns the predicted fashion style
    along with confidence, explanation, and outfit suggestions.
    
    Request: multipart/form-data with 'image' field
    
    Response (200):
    {
        "prediction": "Formal",
        "confidence": 94.3,
        "all_predictions": {"Casual": 2.1, "Ethnic": 1.5, "Formal": 94.3, "Sports": 2.1},
        "reason": "This outfit is classified as Formal because...",
        "suggestions": {
            "outfits": [...],
            "accessories": [...],
            "colors": [...],
            "occasions": [...],
            "season": "...",
            "footwear": [...]
        }
    }
    """
    try:
        # Check if image file is present in request
        if 'image' not in request.files:
            return jsonify({
                "error": "No image file provided",
                "message": "Please upload an image file using the 'image' field."
            }), 400
        
        file = request.files['image']
        
        # Validate the uploaded image
        is_valid, error_message = validate_image(file)
        if not is_valid:
            return jsonify({
                "error": error_message,
                "message": error_message
            }), 400
        
        # Save the uploaded file with a unique name
        file_extension = file.filename.rsplit('.', 1)[1].lower()
        unique_filename = f"{uuid.uuid4().hex}.{file_extension}"
        upload_folder = current_app.config.get('UPLOAD_FOLDER', 'uploads')
        
        # Ensure upload directory exists
        os.makedirs(upload_folder, exist_ok=True)
        
        file_path = os.path.join(upload_folder, unique_filename)
        file.save(file_path)
        
        logger.info(f"Image saved: {file_path}")
        
        try:
            # Preprocess the image for the model
            preprocessed = preprocess_image(file_path)
            
            # Run prediction
            result = predict(preprocessed)
            
            predicted_style = result["prediction"]
            confidence = result["confidence"]
            
            # Generate explanation
            reason = get_style_explanation(predicted_style, confidence)
            
            # Get outfit suggestions
            suggestions = get_outfit_suggestions(predicted_style)
            
            response = {
                "prediction": predicted_style,
                "confidence": confidence,
                "all_predictions": result["all_predictions"],
                "reason": reason,
                "suggestions": suggestions
            }
            
            logger.info(f"Prediction successful: {predicted_style} ({confidence}%)")
            
            return jsonify(response), 200
            
        finally:
            # Clean up the uploaded file after prediction
            if os.path.exists(file_path):
                os.remove(file_path)
                logger.info(f"Cleaned up: {file_path}")
    
    except RuntimeError as e:
        logger.error(f"Model error: {str(e)}")
        return jsonify({
            "error": "Model is not available. Please try again later.",
            "message": str(e)
        }), 500
    
    except Exception as e:
        logger.error(f"Prediction endpoint error: {str(e)}")
        return jsonify({
            "error": "Failed to process image",
            "message": "An unexpected error occurred. Please try again."
        }), 500


@predict_bp.route('/recommend-style', methods=['POST'])
def recommend():
    """
    POST /recommend-style
    
    Accepts quiz answers and returns a style recommendation
    with suitability score, explanation, and outfit suggestions.
    
    Request: application/json
    {
        "gender": "male",
        "age_group": "18-25",
        "occupation": "student",
        "lifestyle": "active",
        "comfort": "comfortable",
        "colors": "blue",
        "occasion": "daily",
        "clothing_type": "t-shirts",
        "climate": "hot",
        "budget": "mid-range"
    }
    
    Response (200):
    {
        "recommended_style": "Casual",
        "suitability": 93,
        "reason": "...",
        "alternatives": [...],
        "suggestions": {...}
    }
    """
    try:
        # Parse JSON body
        data = request.get_json()
        
        if not data:
            return jsonify({
                "error": "Invalid quiz answers provided",
                "message": "Please provide quiz answers in JSON format."
            }), 400
        
        # Validate that we have at least some answers
        valid_keys = {
            'gender', 'age_group', 'occupation', 'lifestyle', 'comfort',
            'colors', 'occasion', 'clothing_type', 'climate', 'budget'
        }
        
        provided_keys = set(data.keys()) & valid_keys
        if len(provided_keys) < 3:
            return jsonify({
                "error": "Insufficient quiz answers",
                "message": "Please answer at least 3 questions for an accurate recommendation."
            }), 400
        
        # Get style recommendation
        result = recommend_style(data)
        
        # Get outfit suggestions for the recommended style
        suggestions = get_outfit_suggestions(result["recommended_style"])
        
        response = {
            "recommended_style": result["recommended_style"],
            "suitability": result["suitability"],
            "reason": result["reason"],
            "alternatives": result["alternatives"],
            "suggestions": suggestions
        }
        
        logger.info(f"Recommendation: {result['recommended_style']} ({result['suitability']}%)")
        
        return jsonify(response), 200
    
    except Exception as e:
        logger.error(f"Recommendation endpoint error: {str(e)}")
        return jsonify({
            "error": "Failed to process recommendation",
            "message": "An unexpected error occurred. Please try again."
        }), 500


@predict_bp.route('/trending', methods=['GET'])
def trending():
    """
    GET /trending
    
    Returns trending fashion data including styles, colors,
    accessories, and seasonal recommendations.
    """
    try:
        data = get_trending()
        return jsonify(data), 200
    except Exception as e:
        logger.error(f"Trending endpoint error: {str(e)}")
        return jsonify({
            "error": "Failed to fetch trending data",
            "message": "An unexpected error occurred."
        }), 500


@predict_bp.route('/health', methods=['GET'])
def health_check():
    """
    GET /health
    
    Health check endpoint to verify the API is running
    and the model is loaded.
    """
    try:
        model = load_model()
        model_loaded = model is not None
    except Exception:
        model_loaded = False
    
    return jsonify({
        "status": "healthy" if model_loaded else "degraded",
        "model_loaded": model_loaded,
        "service": "AI Fashion Assistant API"
    }), 200 if model_loaded else 503
