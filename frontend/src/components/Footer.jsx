import React from 'react';
import { Link } from 'react-router-dom';
import { IoShirtOutline, IoHeart, IoCode } from 'react-icons/io5';

const Footer = () => {
  return (
    <footer className="border-t border-dark-200 dark:border-dark-800/60 bg-dark-50 dark:bg-dark-950/40 text-dark-500 dark:text-dark-400 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="gradient-bg p-1.5 rounded-lg text-white">
                <IoShirtOutline className="w-5 h-5" />
              </div>
              <span className="font-heading font-bold text-lg text-dark-800 dark:text-dark-100">
                FashionAI
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              AI-powered style classifier and fashion recommendation platform. Discover what fits you best with neural networks.
            </p>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-dark-800 dark:text-dark-100 mb-4 text-sm uppercase tracking-wider">Quick Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/upload" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Analyze Style</Link></li>
              <li><Link to="/quiz" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Find My Style</Link></li>
              <li><Link to="/trending" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Trending Now</Link></li>
              <li><Link to="/favorites" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Saved Outfits</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-dark-800 dark:text-dark-100 mb-4 text-sm uppercase tracking-wider">Hackathon Specs</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center"><IoCode className="mr-2 text-primary-500" /> React 18, Vite & Tailwind</li>
              <li className="flex items-center"><IoCode className="mr-2 text-primary-500" /> Flask Backend API</li>
              <li className="flex items-center"><IoCode className="mr-2 text-primary-500" /> Keras fashion_classifier model</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-dark-200 dark:border-dark-800/40 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs">
          <p>© {new Date().getFullYear()} FashionAI Assistant. Built with Tensorflow & Pythons Flask.</p>
          <p className="flex items-center mt-4 sm:mt-0">
            Made with <IoHeart className="mx-1 text-accent-500 animate-pulse" /> for academic showcase
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
