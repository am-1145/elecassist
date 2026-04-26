import { useState } from 'react';
import Navbar from './components/layout/Navbar';
import ProgressTracker from './components/layout/ProgressTracker';
import Timeline from './components/features/Timeline';
import { useJourney } from './context/JourneyContext';
import MythFactCard from './components/features/MythFactCard';
import QuizComponent from './components/features/QuizComponent';
import MapComponent from './components/integrations/MapComponent';
import PollingDayChecklist from './components/features/PollingDayChecklist';
import SmartAssistant from './components/integrations/SmartAssistant';
import { mockMythsFacts } from './data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';

function App() {
  const { currentStep, markStepComplete, setStep } = useJourney();
  const [chatOpen, setChatOpen] = useState(false);

  const StepContent = () => {
    switch (currentStep) {
      case 'eligibility':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Am I Eligible to Vote?</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                To vote in elections, you must be a citizen, at least 18 years old, and a resident of the polling area setup by the Election Commission. Let's test your knowledge!
              </p>
              <QuizComponent />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Myths vs Facts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockMythsFacts.map((mf, i) => (
                  <MythFactCard key={i} myth={mf.myth} fact={mf.fact} />
                ))}
              </div>
            </div>
            <button 
              onClick={() => { markStepComplete('eligibility'); setStep('registration'); }}
              className="w-full md:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold shadow-md hover:shadow-lg transition-all"
            >
              Continue to Registration &rarr;
            </button>
          </motion.div>
        );

      case 'registration':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-slate-700">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Voter Registration</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Registering to vote is easy. If you are a first-time voter, you need to fill Form 6. You can do this online on the National Voters Service Portal.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                 <div className="p-4 border border-indigo-100 dark:border-indigo-900/50 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-center">
                    <h3 className="font-bold text-indigo-600 dark:text-indigo-400 mb-2">First Time Voter</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Age 18+ and never voted?</p>
                    <button className="text-sm px-4 py-2 bg-indigo-600 text-white rounded-lg w-full">Form 6 Guide</button>
                 </div>
                 <div className="p-4 border border-rose-100 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-900/20 rounded-xl text-center">
                    <h3 className="font-bold text-rose-600 dark:text-rose-400 mb-2">Shifted Address</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Moved to a new place?</p>
                    <button className="text-sm px-4 py-2 bg-rose-600 text-white rounded-lg w-full">Form 8 Guide</button>
                 </div>
                 <div className="p-4 border border-emerald-100 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-center">
                    <h3 className="font-bold text-emerald-600 dark:text-emerald-400 mb-2">Correction</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Typo in your name/age?</p>
                    <button className="text-sm px-4 py-2 bg-emerald-600 text-white rounded-lg w-full">Form 8 Guide</button>
                 </div>
              </div>
            </div>
            <button 
              onClick={() => { markStepComplete('registration'); setStep('polling'); }}
              className="w-full md:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold shadow-md hover:shadow-lg transition-all"
            >
              Continue to Polling Phase &rarr;
            </button>
          </motion.div>
        );

      case 'polling':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
             <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
               <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Find Your Polling Booth</h2>
               <p className="text-gray-600 dark:text-gray-300 mb-4">
                 Your polling booth is assigned based on your registered address. You can view nearby booths on the map below.
               </p>
               <MapComponent />
             </div>
             <button 
              onClick={() => { markStepComplete('polling'); setStep('preparation'); }}
              className="w-full md:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold shadow-md hover:shadow-lg transition-all"
            >
              Prepare for Voting Day &rarr;
            </button>
          </motion.div>
        );
        
      case 'preparation':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
            <PollingDayChecklist />
            <button 
              onClick={() => { markStepComplete('preparation'); }}
              className="w-full md:w-auto px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold shadow-md hover:shadow-lg transition-all"
            >
              I am Ready to Vote!
            </button>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <ProgressTracker />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 md:flex md:space-x-8">
        {/* Left main content area */}
        <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col">
          <Timeline />
          <div className="mt-8">
            <AnimatePresence mode="wait">
              <StepContent key={currentStep} />
            </AnimatePresence>
          </div>
        </div>

        {/* Right sidebar - Assistant (Desktop) */}
        <div className="hidden md:block md:w-1/3 lg:w-1/4 mt-8 md:mt-24 sticky top-32 h-fit">
          <SmartAssistant />
        </div>
      </main>

      {/* Mobile Floating Assistant Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <button 
          onClick={() => setChatOpen(!chatOpen)}
          className="w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-105"
        >
          {chatOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Assistant Panel */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="md:hidden fixed bottom-24 right-4 left-4 z-50 shadow-2xl rounded-2xl overflow-hidden"
          >
            <SmartAssistant />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
