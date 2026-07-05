import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl bg-dark-100 hover:bg-dark-200 dark:bg-dark-800 dark:hover:bg-dark-700 text-dark-800 dark:text-dark-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
      aria-label="Toggle theme mode"
    >
      {darkMode ? <IoSunnyOutline className="w-5 h-5 text-amber-400" /> : <IoMoonOutline className="w-5 h-5 text-primary-600" />}
    </button>
  );
};

export default ThemeToggle;
