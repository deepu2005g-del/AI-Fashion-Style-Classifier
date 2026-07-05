import React, { useState, useEffect } from 'react';
import { getHistory, clearHistory, getFavorites } from '../services/storage';
import { IoPersonOutline, IoTimeOutline, IoTrashBinOutline, IoShirtOutline, IoStatsChartOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [history, setHistory] = useState([]);
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    setHistory(getHistory());
    setFavoritesCount(getFavorites().length);
  }, []);

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your prediction history?")) {
      clearHistory();
      setHistory([]);
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    }).format(date);
  };

  // Simple stats
  const uploadCount = history.filter(h => h.type === 'classification').length;
  const quizCount = history.filter(h => h.type === 'recommendation').length;

  return (
    <div className="section-container max-w-5xl">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left Column: User Card & Stats */}
        <div className="w-full md:w-1/3 space-y-6">
          <div className="glass-card p-6 text-center">
            <div className="w-24 h-24 rounded-full gradient-bg mx-auto mb-4 flex items-center justify-center text-white shadow-lg">
              <IoPersonOutline className="w-10 h-10" />
            </div>
            <h2 className="font-heading font-bold text-xl mb-1">Guest User</h2>
            <p className="text-sm text-dark-500 mb-6">Local Session Profile</p>
            
            <div className="grid grid-cols-2 gap-4 border-t border-dark-100 dark:border-dark-800 pt-6">
              <div>
                <div className="text-2xl font-bold text-primary-500">{favoritesCount}</div>
                <div className="text-xs uppercase font-semibold text-dark-500">Saved</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent-500">{history.length}</div>
                <div className="text-xs uppercase font-semibold text-dark-500">History</div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-heading font-bold flex items-center gap-2 mb-4">
              <IoStatsChartOutline className="text-primary-500" /> Platform Usage
            </h3>
            <div className="space-y-4 text-sm font-medium">
              <div className="flex justify-between items-center p-3 bg-dark-50 dark:bg-dark-900 rounded-lg">
                <span className="flex items-center gap-2"><IoShirtOutline className="text-blue-500" /> Image Uploads</span>
                <span>{uploadCount}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-dark-50 dark:bg-dark-900 rounded-lg">
                <span className="flex items-center gap-2"><IoTimeOutline className="text-amber-500" /> Style Quizzes</span>
                <span>{quizCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Activity History */}
        <div className="w-full md:w-2/3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-heading font-extrabold flex items-center gap-2">
              <IoTimeOutline /> Activity History
            </h2>
            {history.length > 0 && (
              <button 
                onClick={handleClearHistory}
                className="text-xs font-semibold text-accent-500 hover:text-accent-600 flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-accent-50 dark:hover:bg-accent-900/30 transition-colors"
              >
                <IoTrashBinOutline /> Clear History
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="glass-card p-10 text-center text-dark-500">
              <div className="mb-4 text-4xl opacity-20">📭</div>
              No activity history yet. 
              <br/> Try <Link to="/upload" className="text-primary-500 hover:underline">uploading an image</Link> or <Link to="/quiz" className="text-accent-500 hover:underline">taking the quiz</Link>.
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((item) => (
                <div key={item.id} className="glass-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-l-primary-500">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl mt-1 ${item.type === 'classification' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400' : 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400'}`}>
                      {item.type === 'classification' ? <IoShirtOutline className="w-5 h-5" /> : <IoStatsChartOutline className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-dark-500 mb-1">
                        {item.type === 'classification' ? 'Image Prediction' : 'Quiz Recommendation'}
                      </div>
                      <h4 className="font-heading font-bold text-lg">
                        {item.type === 'classification' ? item.prediction : item.recommended_style}
                      </h4>
                      {item.type === 'classification' && (
                        <p className="text-xs text-dark-500 font-medium">Confidence: {item.confidence}% • File: {item.imageName}</p>
                      )}
                      {item.type === 'recommendation' && (
                        <p className="text-xs text-dark-500 font-medium">Suitability Match: {item.suitability}%</p>
                      )}
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-dark-400 whitespace-nowrap pl-14 sm:pl-0">
                    {formatDate(item.timestamp)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default ProfilePage;
