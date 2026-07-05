import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/outfitData';
import { IoChevronForward, IoChevronBack, IoCheckmarkCircle } from 'react-icons/io5';

const StyleQuiz = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentQuestion = QUIZ_QUESTIONS[currentStep];
  const progressPercent = Math.round(((currentStep) / QUIZ_QUESTIONS.length) * 100);

  const handleSelectOption = (optionValue) => {
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: optionValue,
    };
    setAnswers(updatedAnswers);

    // Auto-advance with minor delay for better interaction experience
    setTimeout(() => {
      if (currentStep < QUIZ_QUESTIONS.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }, 250);
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (answers[currentQuestion.id] && currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(answers).length >= QUIZ_QUESTIONS.length - 1) {
      onComplete(answers);
    }
  };

  const isLastStep = currentStep === QUIZ_QUESTIONS.length - 1;
  const hasSelectedCurrent = !!answers[currentQuestion.id];

  return (
    <div className="w-full max-w-2xl mx-auto glass-card p-6 sm:p-10 space-y-8 animate-fade-in">
      {/* Progress Header */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm font-semibold">
          <span className="text-primary-500">Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
          <span className="text-dark-500">{progressPercent}% Completed</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill bg-gradient-to-r from-primary-500 to-accent-400"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="space-y-6">
        <h3 className="font-heading font-bold text-xl sm:text-2xl text-dark-900 dark:text-white leading-snug">
          {currentQuestion.question}
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {currentQuestion.options.map((option) => {
            const isSelected = answers[currentQuestion.id] === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelectOption(option.value)}
                className={`w-full p-4 rounded-xl border-2 text-left font-semibold transition-all duration-200 flex items-center justify-between ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-950/20 text-primary-600 dark:text-primary-400 shadow-md scale-[1.01]'
                    : 'border-dark-200 dark:border-dark-800 hover:border-primary-300 hover:bg-dark-50 dark:hover:bg-dark-900/40 text-dark-700 dark:text-dark-300'
                }`}
              >
                <span>{option.label}</span>
                {isSelected && <IoCheckmarkCircle className="w-5 h-5 text-primary-500" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-dark-100 dark:border-dark-800">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="btn-secondary px-4 py-2.5 text-sm flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <IoChevronBack className="w-4 h-4" />
          Previous
        </button>

        {isLastStep ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!hasSelectedCurrent}
            className="btn-accent px-6 py-2.5 text-sm flex items-center gap-1.5"
          >
            Get Results
            <IoCheckmarkCircle className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            disabled={!hasSelectedCurrent}
            className="btn-primary px-5 py-2.5 text-sm flex items-center gap-1.5"
          >
            Next
            <IoChevronForward className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default StyleQuiz;
