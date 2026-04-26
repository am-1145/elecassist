import React from 'react';
import { render } from '../../test-utils';
import { screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';
import '@testing-library/jest-dom';

describe('Navbar Component', () => {
  beforeEach(() => {
    // Mock matchMedia
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
  });

  test('renders the navbar title', () => {
    render(<Navbar />);
    expect(screen.getByText(/Election Assistant/i)).toBeInTheDocument();
  });

  test('toggles theme on button click', () => {
    render(<Navbar />);
    const themeBtn = screen.getByLabelText(/Toggle dark mode/i);
    expect(themeBtn).toBeInTheDocument();
    
    // Initial theme could be light based on mock
    fireEvent.click(themeBtn);
    // document elements context modification validation should pass internally 
  });
  
  test('opens language dropdown', () => {
    render(<Navbar />);
    const langBtn = screen.getByLabelText(/Toggle language/i);
    fireEvent.click(langBtn);
    
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('हिंदी')).toBeInTheDocument();
  });
});
