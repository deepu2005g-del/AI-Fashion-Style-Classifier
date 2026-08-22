"""
AI Fashion Assistant — Flask Backend Application.

Main entry point for the Flask server.
Loads the pre-trained fashion classifier model on startup
and serves API endpoints for style prediction and recommendation.

Usage:
    python app.py
"""

import os
import logging
from flask import Flask
from flask_cors import CORS

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


def create_app():
    """
    Application factory for the Flask app.
    
    Returns:
        Flask: Configured Flask application instance.
    """
    app = Flask(__name__)
    
    # ── Configuration ──────────────────────────────────────────
    app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024  # 10MB max upload
    app.config['UPLOAD_FOLDER'] = os.path.join(
        os.path.dirname(os.path.abspath(__file__)), 'uploads'
    )
    
    # Ensure uploads directory exists
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    
    # ── CORS ───────────────────────────────────────────────────
    # Allow requests from React dev server and common frontend origins
    CORS(app, resources={
        r"/*": {
            "origins": [
                "http://localhost:3000",
                "http://localhost:5173",
                "http://127.0.0.1:3000",
                "http://127.0.0.1:5173",
                "https://ai-fashion-style-classifier.vercel.app"
            ],
            "methods": ["GET", "POST", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
        }
    })
    
    # ── Register Blueprints ────────────────────────────────────
    from routes.predict import predict_bp
    app.register_blueprint(predict_bp, url_prefix='/api')
    
    # ── Root Route ─────────────────────────────────────────────
    @app.route('/')
    def index():
        return {
            "service": "AI Fashion Assistant API",
            "version": "1.0.0",
            "endpoints": {
                "POST /api/predict": "Classify clothing style from image",
                "POST /api/recommend-style": "Get style recommendation from quiz",
                "GET /api/trending": "Get trending fashion data",
                "GET /api/health": "Health check"
            }
        }
    
    # ── Load Model on Startup ──────────────────────────────────
    with app.app_context():
        try:
            from services.classifier import load_model
            load_model()
            logger.info("✅ Fashion classifier model loaded successfully!")
        except FileNotFoundError as e:
            logger.warning(f"⚠️  Model not found: {e}")
            logger.warning("   The /api/predict endpoint will not work until the model is available.")
            logger.warning("   Place 'fashion_classifier.keras' in the backend/ directory.")
        except Exception as e:
            logger.error(f"❌ Failed to load model: {e}")
            logger.warning("   The /api/predict endpoint will not work.")
    
    return app


# ── Run the Application ───────────────────────────────────────
if __name__ == '__main__':
    app = create_app()
    
    logger.info("=" * 60)
    logger.info("  🎨 AI Fashion Assistant API")
    logger.info("  Starting on http://localhost:5000")
    logger.info("=" * 60)
    
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True
    )
