import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { Moon, Sun, Languages } from 'lucide-react';
import { signInWithGoogle, logout, auth } from '../../utils/firebase';
import { onAuthStateChanged, type User } from 'firebase/auth';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { setLanguage, t } = useLanguage();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const toggleLangMenu = () => setLangMenuOpen(!langMenuOpen);
  
  const handleLanguageChange = (lang: 'en' | 'es' | 'hi') => {
    setLanguage(lang);
    setLangMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex-shrink-0 flex items-center">
            <span className="font-bold text-xl md:text-2xl break-words text-indigo-600 dark:text-indigo-400">
              {t('header_title')}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* User Profile / Login */}
            {user ? (
              <div className="flex items-center space-x-2">
                {user.photoURL && <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full" />}
                <span className="text-sm font-medium hidden md:block text-gray-700 dark:text-gray-200">{user.displayName}</span>
                <button 
                  onClick={handleLogout}
                  className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 rounded-full transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={handleLogin}
                className="text-sm font-medium px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-sm transition-colors"
              >
                Sign In
              </button>
            )}

            {/* Language Dropdown */}
            <div className="relative">
              <button 
                onClick={toggleLangMenu}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle language"
                aria-expanded={langMenuOpen}
              >
                <Languages className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 border border-gray-200 dark:border-slate-700">
                  <button onClick={() => handleLanguageChange('en')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30">English</button>
                  <button onClick={() => handleLanguageChange('hi')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30">हिंदी</button>
                  <button onClick={() => handleLanguageChange('es')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30">Español</button>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
