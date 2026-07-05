import React from 'react';

const LoadingSpinner = ({ text = 'Analyzing fashion selections...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 space-y-6 text-center animate-fade-in">
      <div className="relative flex items-center justify-center">
        {/* Outer pulsating ring */}
        <div className="w-16 h-16 rounded-full border-4 border-primary-500/20 border-t-primary-500 animate-spin"></div>
        {/* Inner reverse-spinning accent ring */}
        <div className="absolute w-10 h-10 rounded-full border-4 border-accent-500/10 border-t-accent-500 animate-spin duration-1000 reverse"></div>
      </div>
      
      <div className="space-y-1.5 max-w-xs">
        <p className="font-heading font-semibold text-lg text-dark-800 dark:text-dark-200">
          {text}
        </p>
        <p className="text-xs text-dark-500 dark:text-dark-400">
          Please wait while our models parse the details.
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
