import React from 'react';
import { IoAlertCircleOutline, IoTrendingUp, IoInformationCircleOutline } from 'react-icons/io5';

const PredictionResult = ({ prediction, confidence, allPredictions, reason }) => {
  // Color configuration based on the predicted category
  const styleColorConfigs = {
    Casual: {
      bg: 'bg-blue-50 dark:bg-blue-950/20',
      border: 'border-blue-200 dark:border-blue-900/30',
      text: 'text-blue-700 dark:text-blue-300',
      fill: 'bg-blue-500',
    },
    Ethnic: {
      bg: 'bg-amber-50 dark:bg-amber-950/20',
      border: 'border-amber-200 dark:border-amber-900/30',
      text: 'text-amber-700 dark:text-amber-300',
      fill: 'bg-amber-500',
    },
    Formal: {
      bg: 'bg-indigo-50 dark:bg-indigo-950/20',
      border: 'border-indigo-200 dark:border-indigo-900/30',
      text: 'text-indigo-700 dark:text-indigo-300',
      fill: 'bg-indigo-600',
    },
    Sports: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/20',
      border: 'border-emerald-200 dark:border-emerald-900/30',
      text: 'text-emerald-700 dark:text-emerald-300',
      fill: 'bg-emerald-500',
    },
  };

  const styleConfig = styleColorConfigs[prediction] || styleColorConfigs.Casual;

  return (
    <div className="space-y-6">
      {/* Top Banner / Hero Badge */}
      <div className={`p-6 rounded-2xl border ${styleConfig.bg} ${styleConfig.border} flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-scale-in`}>
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold opacity-75">Model Detection</span>
          <h3 className={`text-3xl font-heading font-extrabold mt-1 ${styleConfig.text}`}>
            {prediction}
          </h3>
        </div>
        
        <div className="text-right">
          <span className="text-xs uppercase tracking-wider font-semibold opacity-75">Confidence Score</span>
          <div className="flex items-center gap-2 mt-1">
            <IoTrendingUp className={`w-6 h-6 ${styleConfig.text}`} />
            <span className="text-3xl font-heading font-extrabold">{confidence}%</span>
          </div>
        </div>
      </div>

      {/* Confidence Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm font-semibold">
          <span>Match Confidence</span>
          <span>{confidence}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className={`progress-fill ${styleConfig.fill}`}
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>

      {/* AI Explanation Reason Box */}
      {reason && (
        <div className="p-5 rounded-xl bg-dark-50 dark:bg-dark-900/50 border border-dark-200 dark:border-dark-800 flex gap-3">
          <IoInformationCircleOutline className="w-6 h-6 text-primary-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-dark-800 dark:text-dark-200 text-sm mb-1">AI Explanation</h4>
            <p className="text-sm text-dark-600 dark:text-dark-300 leading-relaxed">{reason}</p>
          </div>
        </div>
      )}

      {/* Other classes probability chart if available */}
      {allPredictions && (
        <div className="space-y-3 pt-2">
          <h4 className="font-heading font-bold text-dark-800 dark:text-dark-200 text-base">Model Predictions Analysis</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(allPredictions).map(([styleName, score]) => {
              const currentConfig = styleColorConfigs[styleName] || styleColorConfigs.Casual;
              return (
                <div key={styleName} className="p-3.5 rounded-xl border border-dark-250 dark:border-dark-800 bg-white dark:bg-dark-900 flex flex-col gap-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold">{styleName}</span>
                    <span className="font-bold text-dark-500">{score}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-dark-100 dark:bg-dark-800 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${currentConfig.fill}`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionResult;
