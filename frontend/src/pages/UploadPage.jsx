import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageUploader from '../components/ImageUploader';
import LoadingSpinner from '../components/LoadingSpinner';
import { classifyImage } from '../services/api';
import { saveHistoryItem } from '../services/storage';

const UploadPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUploadSubmit = async (imageFile) => {
    setLoading(true);
    setError(null);

    try {
      const result = await classifyImage(imageFile);
      
      // Save result item to local storage history logs
      saveHistoryItem({
        type: 'classification',
        prediction: result.prediction,
        confidence: result.confidence,
        reason: result.reason,
        imageName: imageFile.name,
      });

      // Redirect to ResultPage with details passed via Router state
      navigate('/result', {
        state: {
          source: 'upload',
          prediction: result.prediction,
          confidence: result.confidence,
          all_predictions: result.all_predictions,
          reason: result.reason,
          suggestions: result.suggestions,
        },
      });
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error || 
        'Failed to connect to the backend fashion model. Make sure Flask is active.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-container max-w-4xl">
      <div className="text-center space-y-3 mb-10">
        <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight">
          Analyze Outfit Style
        </h2>
        <p className="text-sm sm:text-base text-dark-500 dark:text-dark-400 max-w-md mx-auto">
          Upload an image of a shirt, dress, jacket, pants, or sport kit. Our convolutional model will analyze it.
        </p>
      </div>

      {loading ? (
        <div className="glass-card p-10 py-16">
          <LoadingSpinner text="Running neural network predictions..." />
        </div>
      ) : (
        <div className="glass-card p-6 sm:p-10">
          <ImageUploader onUpload={handleUploadSubmit} error={error} />
        </div>
      )}
    </div>
  );
};

export default UploadPage;
