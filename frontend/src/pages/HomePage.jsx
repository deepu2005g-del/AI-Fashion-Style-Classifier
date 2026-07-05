import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import { IoShirtOutline, IoSparklesOutline } from 'react-icons/io5';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col justify-center">
      {/* Banner introduction with header */}
      <HeroSection />

      {/* Choice split panel options */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Option 1: Upload */}
          <div 
            onClick={() => navigate('/upload')}
            className="group cursor-pointer p-8 sm:p-10 rounded-3xl border-2 border-primary-100 hover:border-primary-400 dark:border-dark-800 dark:hover:border-primary-500 bg-white/70 dark:bg-dark-900/40 backdrop-blur-md shadow-lg hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-primary-100 dark:bg-primary-950/40 flex items-center justify-center text-primary-600 dark:text-primary-400 text-3xl group-hover:scale-110 transition-transform">
                <IoShirtOutline className="animate-bounce-slow" />
              </div>
              <h3 className="font-heading font-extrabold text-2xl text-dark-900 dark:text-white">
                Upload Outfit Image
              </h3>
              <p className="text-sm text-dark-600 dark:text-dark-400 leading-relaxed">
                Already have a style in mind? Take a photo or upload an image file of any clothing item. Our AI will classify it instantly.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 font-bold text-sm text-primary-600 dark:text-primary-400 group-hover:translate-x-1.5 transition-transform">
              <span>Start Upload Flow</span>
              <span>→</span>
            </div>
          </div>

          {/* Option 2: Quiz */}
          <div 
            onClick={() => navigate('/quiz')}
            className="group cursor-pointer p-8 sm:p-10 rounded-3xl border-2 border-accent-100 hover:border-accent-400 dark:border-dark-800 dark:hover:border-accent-500 bg-white/70 dark:bg-dark-900/40 backdrop-blur-md shadow-lg hover:shadow-xl hover:shadow-accent-500/5 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-accent-100 dark:bg-accent-950/40 flex items-center justify-center text-accent-600 dark:text-accent-400 text-3xl group-hover:scale-110 transition-transform">
                <IoSparklesOutline className="animate-spin-slow" />
              </div>
              <h3 className="font-heading font-extrabold text-2xl text-dark-900 dark:text-white">
                I Don't Know My Style
              </h3>
              <p className="text-sm text-dark-600 dark:text-dark-400 leading-relaxed">
                Need fresh advice on style directions? Answer 10 lifestyle questions and let our engine map out your personalized category.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 font-bold text-sm text-accent-600 dark:text-accent-400 group-hover:translate-x-1.5 transition-transform">
              <span>Take Style Quiz</span>
              <span>→</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HomePage;
