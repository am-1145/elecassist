import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface MythFactCardProps {
  myth: string;
  fact: string;
}

const MythFactCard: React.FC<MythFactCardProps> = ({ myth, fact }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="perspective-1000 w-full h-64 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      aria-pressed={isFlipped}
      tabIndex={0}
      onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') setIsFlipped(!isFlipped); }}
    >
      <motion.div
        className="relative w-full h-full transform-style-3d transition-transform duration-700"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front: Myth */}
        <div className="absolute w-full h-full backface-hidden bg-rose-50 dark:bg-rose-900/20 border-2 border-rose-200 dark:border-rose-900/50 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-sm">
          <span className="text-rose-600 dark:text-rose-400 font-bold uppercase tracking-widest text-sm mb-4">Myth</span>
          <p className="text-lg md:text-xl text-slate-800 dark:text-slate-200 font-medium">{myth}</p>
          <span className="absolute bottom-4 text-xs text-rose-400 dark:text-rose-300">Tap to reveal the truth</span>
        </div>

        {/* Back: Fact */}
        <div 
          className="absolute w-full h-full backface-hidden bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-900/50 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-sm"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest text-sm mb-4">Fact</span>
          <p className="text-lg md:text-xl text-slate-800 dark:text-slate-200 font-medium">{fact}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default MythFactCard;
