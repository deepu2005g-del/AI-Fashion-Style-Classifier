import React from 'react';
import { Link } from 'react-router-dom';
import { IoShirtOutline, IoSparkles, IoArrowForward } from 'react-icons/io5';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-b from-primary-50/50 via-white to-transparent dark:from-dark-900/40 dark:via-dark-950/20 dark:to-transparent">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full bg-primary-300/20 dark:bg-primary-900/10 blur-3xl animate-float"></div>
      <div className="absolute top-1/3 right-1/10 w-96 h-96 rounded-full bg-accent-300/15 dark:bg-accent-950/5 blur-3xl animate-float stagger-2"></div>

      <div className="relative max-w-4xl mx-auto z-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-primary-100 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 text-xs sm:text-sm font-semibold mb-6 animate-fade-in">
          <IoSparkles className="animate-spin-slow text-accent-400" />
          <span>Discover the Future of Fashion AI Assistant</span>
        </div>
        
        <h1 className="font-heading font-extrabold text-4xl sm:text-6xl tracking-tight text-dark-900 dark:text-white leading-tight mb-6 animate-fade-in-up">
          Your Personal AI <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-primary-500 via-primary-400 to-accent-500 bg-clip-text text-transparent">
            Style Classifier & Assistant
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl text-dark-600 dark:text-dark-300 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up stagger-1">
          Upload an image of your clothes to classify them with a neural network, or complete our expert style quiz to find and save your ideal look.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-2">
          <Link to="/upload" className="btn-primary flex items-center justify-center w-full sm:w-auto">
            <IoShirtOutline className="w-5 h-5 mr-2" />
            Analyze My Outfit
          </Link>
          <Link to="/quiz" className="btn-secondary flex items-center justify-center w-full sm:w-auto">
            Find My Style
            <IoArrowForward className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
