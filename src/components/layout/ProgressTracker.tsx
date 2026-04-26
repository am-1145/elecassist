import React from 'react';
import { useJourney } from '../../context/JourneyContext';
import { motion } from 'framer-motion';

const ProgressTracker: React.FC = () => {
  const { progressPercentage, currentStep } = useJourney();

  return (
    <div className="bg-white dark:bg-slate-900 shadow-sm border-b border-gray-100 dark:border-slate-800 p-4 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        
        <div className="mb-2 md:mb-0 w-full md:w-1/3">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">
            Your Journey
          </span>
          <h2 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 capitalize">
            {currentStep.replace('-', ' ')}
          </h2>
        </div>

        <div className="w-full md:w-1/2 flex items-center space-x-4">
          <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
            <motion.div 
              className="bg-indigo-600 h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
          <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 min-w-[3rem] text-right">
            {progressPercentage}%
          </span>
        </div>

      </div>
    </div>
  );
};

export default ProgressTracker;
