import React from 'react';
import { render } from '../../test-utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import QuizComponent from './QuizComponent';
import '@testing-library/jest-dom';

describe('Quiz Component', () => {
  test('renders first question', () => {
    render(<QuizComponent />);
    expect(screen.getByText(/What is the minimum age to be eligible to vote?/i)).toBeInTheDocument();
  });

  test('handles correct answer selection', async () => {
    render(<QuizComponent />);
    
    // Select correct option '18'
    const correctOption = screen.getByText('18');
    fireEvent.click(correctOption);
    
    // Explanation should appear
    expect(screen.getByText(/You must be at least 18 years old/i)).toBeInTheDocument();

    // After delay, it should move to the next question
    await waitFor(() => {
      expect(screen.getByText(/Which form is used for new voter registration?/i)).toBeInTheDocument();
    }, { timeout: 2500 });
  });
});
