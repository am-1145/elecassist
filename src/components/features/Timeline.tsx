import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useJourney, stepsOrder } from '../../context/JourneyContext';

const Timeline: React.FC = () => {
  const { currentStep, completedSteps, setStep } = useJourney();

  return (
    <div className="w-full py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative">
          {/* Vertical line for mobile, horizontal for desktop */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-slate-700 -translate-y-1/2 rounded-full hidden md:block"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0 relative z-10">
            {stepsOrder.map((step, index) => {
              const isCompleted = completedSteps.includes(step);
              const isCurrent = currentStep === step;

              return (
                <div 
                  key={step} 
                  className={`flex items-center md:flex-col group cursor-pointer w-full md:w-auto`}
                  onClick={() => setStep(step)}
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors shadow-sm
                      ${isCurrent ? 'bg-indigo-600 text-white ring-4 ring-indigo-200 dark:ring-indigo-900/50' : 
                        isCompleted ? 'bg-green-500 text-white' : 'bg-white dark:bg-slate-800 text-gray-400 border-2 border-gray-200 dark:border-slate-700'}
                    `}
                  >
                    {isCompleted ? <CheckCircle className="w-6 h-6" /> : <span className="font-bold">{index + 1}</span>}
                  </motion.div>
                  
                  <div className="ml-4 md:ml-0 md:mt-4 flex-1">
                    <h3 className={`text-sm md:text-base font-semibold capitalize ${isCurrent ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400'}`}>
                      {step}
                    </h3>
                  </div>

                  {/* Mobile connector */}
                  {index < stepsOrder.length - 1 && (
                    <div className="md:hidden ml-6 w-0.5 h-full bg-gray-200 dark:bg-slate-700 absolute left-0 top-12 -z-10"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
