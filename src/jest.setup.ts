import '@testing-library/jest-dom';
import { toHaveNoViolations } from 'jest-axe';

// Mock import.meta.env
// @ts-ignore
global.import = {
  meta: {
    env: {
      VITE_GEMINI_API_KEY: 'mock_key',
      VITE_GOOGLE_MAPS_API_KEY: 'mock_key',
    }
  }
};

expect.extend(toHaveNoViolations);

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

window.HTMLElement.prototype.scrollIntoView = jest.fn();
window.scrollTo = jest.fn();
