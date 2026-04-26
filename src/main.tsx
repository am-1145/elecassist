import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { JourneyProvider } from './context/JourneyContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <JourneyProvider>
          <App />
        </JourneyProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
);
