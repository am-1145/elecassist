import React, { useState } from 'react';
import { mockQuizQuestions } from '../../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Trophy } from 'lucide-react';

const QuizComponent: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const question = mockQuizQuestions[currentQuestionIndex];

  const handleAnswerClick = (index: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    if (index === question.correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      if (currentQuestionIndex < mockQuizQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  if (showResult) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center shadow-lg border border-gray-100 dark:border-slate-700">
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Quiz Completed!</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">You scored {score} out of {mockQuizQuestions.length}</p>
        <button 
          onClick={restartQuiz}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-full transition-colors"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 dark:border-slate-700">
      <div className="flex justify-between items-center mb-6 text-sm font-medium text-gray-500 dark:text-gray-400">
        <span>Question {currentQuestionIndex + 1} of {mockQuizQuestions.length}</span>
        <span>Score: {score}</span>
      </div>

      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        {question.question}
      </h3>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === question.correctAnswer;
          const showState = selectedAnswer !== null;

          let btnClass = "bg-gray-50 dark:bg-slate-700/50 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-slate-600";
          
          if (showState) {
            if (isCorrect) btnClass = "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-500";
            else if (isSelected) btnClass = "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-500";
            else btnClass = "bg-gray-50 dark:bg-slate-800/50 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-slate-700 opacity-50";
          }

          return (
            <button
              key={option}
              disabled={showState}
              onClick={() => handleAnswerClick(index)}
              className={`w-full text-left p-4 rounded-xl font-medium transition-all duration-300 flex justify-between items-center ${btnClass}`}
            >
              {option}
              {showState && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500" />}
              {showState && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedAnswer !== null && (
          <motion.div 
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="p-4 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 rounded-xl"
          >
            <p className="font-medium text-sm">
              <span className="font-bold">Explanation: </span>
              {question.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizComponent;
