import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StyleQuiz from '../components/StyleQuiz';
import LoadingSpinner from '../components/LoadingSpinner';
import { getRecommendation } from '../services/api';
import { saveHistoryItem } from '../services/storage';

const QuizPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleQuizComplete = async (answers) => {
    setLoading(true);
    setError(null);

    try {
      const result = await getRecommendation(answers);
      
      // Save result item to local storage history logs
      saveHistoryItem({
        type: 'recommendation',
        recommended_style: result.recommended_style,
        suitability: result.suitability,
        reason: result.reason,
      });

      // Redirect to ResultPage with details
      navigate('/result', {
        state: {
          source: 'quiz',
          recommended_style: result.recommended_style,
          suitability: result.suitability,
          reason: result.reason,
          alternatives: result.alternatives,
          suggestions: result.suggestions,
        },
      });
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error || 
        'Failed to connect to the backend style engine. Make sure Flask is active.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-container">
      <div className="text-center space-y-3 mb-10 max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight">
          Find Your Perfect Style
        </h2>
        <p className="text-sm sm:text-base text-dark-500 dark:text-dark-400">
          Answer 10 quick lifestyle and preference questions. Our recommendation engine will process your answers and map you to the ideal fashion category.
        </p>
      </div>

      {error && (
        <div className="max-w-2xl mx-auto mb-6 p-4 rounded-xl bg-accent-50 text-accent-700 border border-accent-200">
          {error}
        </div>
      )}

      {loading ? (
        <div className="glass-card max-w-2xl mx-auto p-10 py-16">
          <LoadingSpinner text="Computing style alignment matrix..." />
        </div>
      ) : (
        <StyleQuiz onComplete={handleQuizComplete} />
      )}
    </div>
  );
};

export default QuizPage;
