import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IoMenu, IoClose, IoShirtOutline, IoHeart, IoPerson } from 'react-icons/io5';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/upload', label: 'Analyze Style' },
    { to: '/quiz', label: 'Style Quiz' },
    { to: '/favorites', label: 'Favorites', icon: <IoHeart className="inline-block mr-1 text-accent-400" /> },
    { to: '/profile', label: 'Profile', icon: <IoPerson className="inline-block mr-1" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-card rounded-none border-t-0 border-x-0 bg-white/80 dark:bg-dark-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="gradient-bg p-2 rounded-xl text-white">
              <IoShirtOutline className="w-6 h-6 animate-pulse" />
            </div>
            <span className="font-heading font-extrabold text-xl tracking-tight bg-gradient-to-r from-primary-600 via-primary-400 to-accent-500 bg-clip-text text-transparent">
              FashionAI
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? 'text-primary-600 dark:text-primary-400 font-bold'
                      : 'text-dark-600 dark:text-dark-300 hover:text-primary-500 dark:hover:text-primary-400'
                  }`
                }
              >
                {link.icon}
                {link.label}
              </NavLink>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button / Toggle */}
          <div className="flex md:hidden items-center space-x-3">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="p-2 rounded-xl text-dark-600 dark:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <IoClose className="w-6 h-6" /> : <IoMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-card rounded-t-none border-x-0 border-b border-dark-200 dark:border-dark-800 animate-slide-up bg-white/95 dark:bg-dark-900/95">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center block px-3 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400'
                      : 'text-dark-700 dark:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-800/50 hover:text-primary-500'
                  }`
                }
              >
                {link.icon && <span className="mr-2">{link.icon}</span>}
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
