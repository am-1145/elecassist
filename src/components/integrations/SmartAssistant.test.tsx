import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '../../test-utils';
import SmartAssistant from './SmartAssistant';

jest.mock('@google/generative-ai', () => {
  const mockSendMessage = jest.fn().mockResolvedValue({
    response: {
      text: () => "I am a helpful election assistant response."
    }
  });
  
  return {
    GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
      getGenerativeModel: jest.fn().mockReturnValue({
        startChat: jest.fn().mockReturnValue({
          sendMessage: mockSendMessage
        })
      })
    }))
  };
});

describe('SmartAssistant Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('renders initial welcome message', () => {
    render(<SmartAssistant />);
    expect(screen.getByText(/Hello! I'm your Election Assistant/i)).toBeInTheDocument();
  });

  it('allows user to type and send a message', async () => {
    render(<SmartAssistant />);
    const input = screen.getByPlaceholderText(/Type your question.../i);
    const submitBtn = screen.getByLabelText(/Send message/i);
    
    expect(submitBtn).toBeDisabled();

    fireEvent.change(input, { target: { value: 'How do I register?' } });
    expect(submitBtn).not.toBeDisabled();

    fireEvent.click(submitBtn);

    expect(screen.getByText('How do I register?')).toBeInTheDocument();
    
    // Check if input is cleared
    expect(input).toHaveValue('');

    // Fast forward until mock API response
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // Check if AI response is rendered
    await waitFor(() => {
      expect(screen.getByText(/I am a helpful election assistant response./i)).toBeInTheDocument();
    });
  });
});
