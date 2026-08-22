live server : https://ai-fashion-style-classifier.vercel.app/ # AI Fashion Style Classifier

A complete, production-ready AI Fashion Style Classifier web application built with React, Flask, and TensorFlow.

This application uses a pre-trained Keras model (`fashion_classifier.keras`) to classify clothing styles (Casual, Ethnic, Formal, Sports) and provides rich fashion recommendations, wardrobe building tools, a smart quiz engine, and trend tracking.

## Features

- **Upload & Analyze**: Drag-and-drop an image of any clothing item. The AI backend processes the image, runs it through the neural network, and instantly classifies the style with confidence scores and AI-generated explanations.
- **Find My Style Quiz**: Don't know what to wear? Take a 10-question expert style quiz that evaluates your lifestyle, budget, color preferences, and occasion needs to mathematically map you to your ideal style aesthetic.
- **Wardrobe Builder**: Based on predictions or quiz results, get highly curated recommendations for core clothing pieces, footwear, and accessories to build a complete look.
- **Trending Now**: Track the most popular fashion categories, color palettes, and seasonal accessories dynamically.
- **Personal Profile**: Save favorite outfits, track your prediction history, and monitor your interactions with the platform.
- **Premium UI/UX**: Built with Tailwind CSS, featuring glassmorphism cards, responsive dark/light mode, micro-animations, and smooth page transitions.

---

## Tech Stack

**Frontend**:
- React 18 (Vite)
- Tailwind CSS v3 (Custom themes, gradients, and animations)
- React Router DOM
- Axios
- React Icons

**Backend**:
- Python 3 / Flask
- TensorFlow 2 / Keras (Inference only)
- Pillow & NumPy (Image preprocessing)
- Flask-CORS

---

## Project Structure

```
d:\AI-Fashion-Style-Classifier\
├── backend\
│   ├── app.py                      # Flask API entry point
│   ├── fashion_classifier.keras    # PRE-TRAINED MODEL FILE (Must be placed here!)
│   ├── requirements.txt            # Python dependencies
│   ├── uploads\                    # Temporary folder for image processing
│   ├── routes\
│   │   └── predict.py              # API Endpoints
│   ├── services\
│   │   ├── classifier.py           # TensorFlow model loading & inference
│   │   ├── recommender.py          # Style quiz algorithm
│   │   └── outfit_engine.py        # Wardrobe & trending data provider
│   └── utils\
│       └── image_utils.py          # Validation and tensor preprocessing
│
└── frontend\
    ├── package.json                # Node dependencies
    ├── vite.config.js              # Vite bundler config with API proxy
    ├── tailwind.config.js          # Tailwind design system
    ├── index.html                  # HTML entry
    └── src\
        ├── App.jsx                 # Routing and layout
        ├── main.jsx                # React mount
        ├── index.css               # Global styles and Tailwind directives
        ├── components\             # Reusable UI elements (Navbar, Cards, etc.)
        ├── pages\                  # Main route views
        ├── services\               # Axios API config & LocalStorage manager
        ├── context\                # Dark mode theme context
        └── data\                   # Static fashion data configs
```

---

## Installation & Setup Instructions

### 1. Backend Setup (Flask & TensorFlow)

1. Open a terminal and navigate to the project root.
2. Create and activate a Python virtual environment:
   ```bash
   python -m venv env
   # Windows:
   env\Scripts\activate
   # Mac/Linux:
   source env/bin/activate
   ```
3. Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
4. **IMPORTANT**: Place your trained model file (`fashion_classifier.keras`) directly inside the `backend/` directory.
5. Start the Flask server:
   ```bash
   python app.py
   ```
   *The backend will run on `http://localhost:5000`.*

### 2. Frontend Setup (React & Vite)

1. Open a **new** terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install Node dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on `http://localhost:3000`.*

---

## How It Works

1. **Model Loading**: When `backend/app.py` starts, it calls `load_model()` from `services/classifier.py` which loads `fashion_classifier.keras` into memory globally.
2. **Image Preprocessing**: Uploaded images are checked for validity (type, size), resized to `128x128` pixels, normalized to `[0, 1]`, and converted to `float32` tensors via Pillow and NumPy.
3. **Inference**: The tensor is passed to `model.predict()`. The API returns the highest probability class along with a dictionary of all class probabilities.
4. **Frontend Proxy**: The Vite config proxies `/api` requests to port `5000` avoiding CORS issues in development.

## Deployment

### Deploy Backend (Render)
1. Add `gunicorn` to your `backend/requirements.txt` (already done).
2. Ensure your `.keras` model file is in the repo (`.gitignore` updated to allow this).
3. Create a **Web Service** on Render pointing to your GitHub repository.
4. Set **Root Directory** to `backend`.
5. Set **Build Command** to `pip install -r requirements.txt`.
6. Set **Start Command** to `gunicorn app:create_app() --bind 0.0.0.0:$PORT`.
7. Once deployed, note your Render URL (e.g., `https://your-backend.onrender.com`).

### Deploy Frontend (Vercel)
1. Create a new project on Vercel pointing to your GitHub repository.
2. Set **Root Directory** to `frontend`.
3. Add an Environment Variable: 
   - Key: `VITE_API_URL`
   - Value: `https://your-backend.onrender.com/api` (use your actual Render backend URL).
4. Click Deploy.

### Final Wiring
Update `backend/app.py` CORS origins to include your newly created Vercel frontend URL, commit, and push.

---

## Disclaimer

This project uses an existing, pre-trained `.keras` file. There are no training scripts included. It is purely an inference and recommendation platform.