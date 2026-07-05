"""
Fashion Classifier Service.
Loads the pre-trained TensorFlow/Keras model and provides prediction functionality.
DO NOT retrain — this uses the existing fashion_classifier.keras model.
"""

import os
import numpy as np
import logging

logger = logging.getLogger(__name__)

# Class mapping for the fashion classifier
CLASS_MAPPING = {
    0: "Casual",
    1: "Ethnic",
    2: "Formal",
    3: "Sports"
}

# Global model reference
_model = None


def load_model():
    """
    Load the pre-trained fashion classifier model from disk.
    The model file should be located at backend/fashion_classifier.keras.
    
    Returns:
        The loaded TensorFlow/Keras model.
        
    Raises:
        FileNotFoundError: If the model file does not exist.
        Exception: If the model fails to load.
    """
    global _model
    
    if _model is not None:
        logger.info("Model already loaded, returning cached model.")
        return _model
    
    # Determine model path relative to this file's location
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    model_path = os.path.join(base_dir, 'fashion_classifier.keras')
    
    if not os.path.exists(model_path):
        logger.error(f"Model file not found at: {model_path}")
        raise FileNotFoundError(
            f"Model file not found at: {model_path}. "
            "Please place 'fashion_classifier.keras' in the backend/ directory."
        )
    
    try:
        # Import TensorFlow here to avoid import overhead if model isn't needed yet
        import tensorflow as tf
        
        logger.info(f"Loading model from: {model_path}")
        _model = tf.keras.models.load_model(model_path)
        logger.info("Model loaded successfully.")
        logger.info(f"Model input shape: {_model.input_shape}")
        logger.info(f"Model output shape: {_model.output_shape}")
        
        return _model
        
    except Exception as e:
        logger.error(f"Failed to load model: {str(e)}")
        raise


def predict(preprocessed_image):
    """
    Run prediction on a preprocessed image using the loaded model.
    
    Args:
        preprocessed_image (numpy.ndarray): Preprocessed image array 
            with shape (1, 128, 128, 3), normalized to [0, 1].
    
    Returns:
        dict: {
            "prediction": str (e.g., "Formal"),
            "confidence": float (e.g., 94.3),
            "all_predictions": dict (e.g., {"Casual": 2.1, "Ethnic": 1.5, ...})
        }
        
    Raises:
        RuntimeError: If the model is not loaded.
        Exception: If prediction fails.
    """
    global _model
    
    if _model is None:
        raise RuntimeError("Model is not loaded. Call load_model() first.")
    
    try:
        # Run prediction
        predictions = _model.predict(preprocessed_image, verbose=0)
        
        # Get the predicted class index and confidence
        predicted_index = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_index]) * 100
        
        # Build all predictions map
        all_predictions = {}
        for idx, class_name in CLASS_MAPPING.items():
            all_predictions[class_name] = round(float(predictions[0][idx]) * 100, 1)
        
        predicted_style = CLASS_MAPPING[predicted_index]
        
        logger.info(f"Prediction: {predicted_style} ({confidence:.1f}%)")
        
        return {
            "prediction": predicted_style,
            "confidence": round(confidence, 1),
            "all_predictions": all_predictions
        }
        
    except Exception as e:
        logger.error(f"Prediction failed: {str(e)}")
        raise
