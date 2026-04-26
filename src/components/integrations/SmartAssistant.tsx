import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getEnvVar } from '../../utils/env';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
}

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(getEnvVar('VITE_GEMINI_API_KEY') || '');
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  systemInstruction: "You are an Election Assistant. Your job is to help users with voter registration, eligibility, and polling booths. Provide short, concise, and helpful answers."
});

const SmartAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'ai', text: "Hello! I'm your Election Assistant. Ask me anything about voter registration, eligibility, or polling booths!" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const [chatSession, setChatSession] = useState<any>(null);

  useEffect(() => {
    // Initialize chat session
    if (getEnvVar('VITE_GEMINI_API_KEY')) {
       setChatSession(model.startChat({
          history: [
            {
              role: "user",
              parts: [{ text: "Hello" }],
            },
            {
              role: "model",
              parts: [{ text: "Hello! I'm your Election Assistant. Ask me anything about voter registration, eligibility, or polling booths!" }],
            },
          ],
       }));
    }
  }, []);

  useEffect(() => {

    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { id: Date.now().toString(), sender: 'user' as const, text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    if (!getEnvVar('VITE_GEMINI_API_KEY')) {
      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'ai', text: "Please provide a VITE_GEMINI_API_KEY in .env.local to use the smart assistant." }]);
        setIsTyping(false);
      }, 1000);
      return;
    }


    try {
      if (!chatSession) return;
      const result = await chatSession.sendMessage(userMessage.text);
      const response = await result.response;
      const text = response.text();
      
      const aiMessage = { id: (Date.now() + 1).toString(), sender: 'ai' as const, text: text };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: 'ai', text: "Sorry, I am having trouble connecting to my brain right now." }]);
    } finally {
      setIsTyping(false);
    }
  };


  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 h-[500px] flex flex-col overflow-hidden">
      
      <div className="bg-indigo-600 dark:bg-indigo-900 text-white p-4 flex items-center space-x-3 shadow-md z-10">
        <div className="bg-white/20 p-2 rounded-full relative">
          <Bot className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-indigo-600 rounded-full animate-pulse"></span>
        </div>
        <div>
          <h3 className="font-bold">Smart Assistant</h3>
          <p className="text-xs text-indigo-100 opacity-90">Powered by AI Simulation</p>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50 dark:bg-slate-900/50">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-end max-w-[80%] space-x-2 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.sender === 'user' ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                  {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-indigo-600 text-white rounded-br-none' 
                    : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-slate-700 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="flex items-end max-w-[80%] space-x-2">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                <Bot className="w-5 h-5" />
              </div>
              <div className="p-4 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl rounded-bl-none shadow-sm flex space-x-1">
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      <div className="p-3 bg-white dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex items-center space-x-2 relative"
        >
          <button type="button" aria-label="Use voice input" className="p-2 text-gray-400 hover:text-indigo-600 transition-colors" title="Voice Mock">
            <Mic className="w-5 h-5" />
          </button>
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your question..."
            aria-label="Ask the smart assistant"
            className="flex-1 bg-gray-100 dark:bg-slate-700 border-transparent focus:bg-white dark:focus:bg-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 rounded-full py-2 px-4 outline-none text-gray-800 dark:text-gray-200 transition-all text-sm md:text-base"
          />
          <button 
            type="submit"
            disabled={!inputValue.trim()}
            aria-label="Send message"
            className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-colors disabled:bg-gray-300 dark:disabled:bg-slate-600"
          >
            <Send className="w-5 h-5 ml-0.5" aria-hidden="true" />
          </button>
        </form>
      </div>

    </div>
  );
};

export default SmartAssistant;
