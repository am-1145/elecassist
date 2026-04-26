import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type JourneyStep = 'eligibility' | 'registration' | 'polling' | 'preparation';

export const stepsOrder: JourneyStep[] = ['eligibility', 'registration', 'polling', 'preparation'];

interface JourneyContextType {
  currentStep: JourneyStep;
  completedSteps: string[];
  setStep: (step: JourneyStep) => void;
  markStepComplete: (step: JourneyStep) => void;
  progressPercentage: number;
}

const JourneyContext = createContext<JourneyContextType | undefined>(undefined);

export const JourneyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<JourneyStep>(() => {
    return (localStorage.getItem('currentStep') as JourneyStep) || 'eligibility';
  });

  const [completedSteps, setCompletedSteps] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('completedSteps');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('currentStep', currentStep);
  }, [currentStep]);

  useEffect(() => {
    localStorage.setItem('completedSteps', JSON.stringify(completedSteps));
  }, [completedSteps]);

  const setStep = (step: JourneyStep) => setCurrentStep(step);

  const markStepComplete = (step: JourneyStep) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps(prev => [...prev, step]);
    }
  };

  const progressPercentage = Math.round((completedSteps.length / stepsOrder.length) * 100);

  return (
    <JourneyContext.Provider value={{ currentStep, completedSteps, setStep, markStepComplete, progressPercentage }}>
      {children}
    </JourneyContext.Provider>
  );
};

export const useJourney = () => {
  const context = useContext(JourneyContext);
  if (context === undefined) {
    throw new Error('useJourney must be used within a JourneyProvider');
  }
  return context;
};
