"""
Image utility functions for validation and preprocessing.
Handles image validation, resizing, and normalization for the fashion classifier model.
"""

import os
import numpy as np
from PIL import Image

# Allowed image extensions
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}

# Maximum file size: 10MB
MAX_FILE_SIZE = 10 * 1024 * 1024

# Model input dimensions
IMG_WIDTH = 224
IMG_HEIGHT = 224


def allowed_file(filename):
    """
    Check if the uploaded file has an allowed extension.
    
    Args:
        filename (str): Name of the uploaded file.
        
    Returns:
        bool: True if the file extension is allowed, False otherwise.
    """
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def validate_image(file):
    """
    Validate the uploaded image file.
    
    Args:
        file: Flask FileStorage object.
        
    Returns:
        tuple: (is_valid: bool, error_message: str or None)
    """
    if file is None or file.filename == '':
        return False, "No image file provided"
    
    if not allowed_file(file.filename):
        return False, "Unsupported file type. Use jpg, jpeg, or png"
    
    # Check file size by reading content length
    file.seek(0, os.SEEK_END)
    file_size = file.tell()
    file.seek(0)  # Reset file pointer
    
    if file_size > MAX_FILE_SIZE:
        return False, "File too large. Maximum size is 10MB"
    
    if file_size == 0:
        return False, "File is empty"
    
    return True, None


def preprocess_image(image_path):
    """
    Preprocess an image for the fashion classifier model.
    
    Steps:
        1. Open the image file.
        2. Convert to RGB (handles RGBA, grayscale, etc.).
        3. Resize to 128x128 pixels.
        4. Normalize pixel values to [0, 1].
        5. Expand dimensions for batch prediction.
    
    Args:
        image_path (str): Path to the image file.
        
    Returns:
        numpy.ndarray: Preprocessed image array with shape (1, 224, 224, 3).
        
    Raises:
        ValueError: If the image cannot be opened or processed.
    """
    try:
        img = Image.open(image_path)
        
        # Convert to RGB if necessary (handles RGBA, L, P modes)
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Resize to model input dimensions
        img = img.resize((IMG_WIDTH, IMG_HEIGHT), Image.LANCZOS)
        
        # Convert to numpy array and normalize to [0, 1]
        img_array = np.array(img, dtype=np.float32) / 255.0
        
        # Expand dimensions for batch prediction: (224, 224, 3) -> (1, 224, 224, 3)
        img_array = np.expand_dims(img_array, axis=0)
        
        return img_array
        
    except Exception as e:
        raise ValueError(f"Failed to process image: {str(e)}")
