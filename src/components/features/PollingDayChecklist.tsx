import React, { useState } from 'react';
import { CheckSquare, Square } from 'lucide-react';
import { motion } from 'framer-motion';

const defaultChecklist = [
  { id: '1', text: 'Verify name in voter slip', checked: false },
  { id: '2', text: 'Carry valid Photo ID (e.g., EPIC, Aadhaar)', checked: false },
  { id: '3', text: 'Check polling booth location', checked: false },
  { id: '4', text: 'Mask & hand sanitizer (optional but recommended)', checked: false },
];

const PollingDayChecklist: React.FC = () => {
  const [items, setItems] = useState(defaultChecklist);

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const progress = Math.round((items.filter(i => i.checked).length / items.length) * 100);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Polling Day Checklist</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Be prepared before stepping out</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{progress}%</span>
        </div>
      </div>

      <div className="w-full bg-gray-100 dark:bg-slate-700 h-2 rounded-full mb-6 overflow-hidden">
        <motion.div 
          className="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`w-full flex items-center p-3 rounded-xl transition-colors border ${
              item.checked 
                ? 'bg-indigo-50 border-indigo-100 dark:bg-indigo-900/20 dark:border-indigo-900/50' 
                : 'bg-transparent border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50'
            }`}
          >
            <div className={`flex-shrink-0 mr-4 ${item.checked ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-500'}`}>
              {item.checked ? <CheckSquare className="w-6 h-6" /> : <Square className="w-6 h-6" />}
            </div>
            <span className={`text-left text-sm md:text-base transition-colors ${
              item.checked 
                ? 'text-gray-500 dark:text-gray-400 line-through' 
                : 'text-gray-700 dark:text-gray-200'
            }`}>
              {item.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PollingDayChecklist;
