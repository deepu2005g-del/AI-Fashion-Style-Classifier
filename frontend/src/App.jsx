import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { checkApiHealth } from './services/api';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import FavoritesPage from './pages/FavoritesPage';
import ProfilePage from './pages/ProfilePage';

// Warning Banner Component
const ApiWarningBanner = () => (
  <div className="bg-accent-500 text-white text-center py-2 px-4 text-sm font-semibold">
    ⚠️ Warning: Cannot connect to the Flask backend or model is missing. Predictions will fail. Ensure `python app.py` is running and `fashion_classifier.keras` exists.
  </div>
);

const App = () => {
  const [apiHealthy, setApiHealthy] = useState(true);

  // Ping backend on load to check if model and server are up
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await checkApiHealth();
        if (res.status !== 'healthy') setApiHealthy(false);
      } catch (e) {
        setApiHealthy(false);
      }
    };
    checkHealth();
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-white dark:bg-dark-950 text-dark-900 dark:text-dark-100 font-body transition-colors duration-300">
          {!apiHealthy && <ApiWarningBanner />}
          <Navbar />
          
          <main className="flex-grow flex flex-col relative w-full">
            {/* Background base styling common across all pages */}
            <div className="absolute inset-0 z-0 opacity-40 dark:opacity-20 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary-50 to-transparent dark:from-primary-900/10"></div>
            </div>
            
            <div className="relative z-10 flex-grow flex flex-col">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/result" element={<ResultPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </div>
          </main>

          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
