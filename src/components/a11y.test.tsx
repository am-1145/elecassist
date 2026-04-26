import React from 'react';
import { render } from '../test-utils';
import { axe } from 'jest-axe';
import Navbar from './layout/Navbar';
import QuizComponent from './features/QuizComponent';
import SmartAssistant from './integrations/SmartAssistant';

describe('Accessibility Checks', () => {
  it('Navbar should not have any accessibility violations', async () => {
    const { container } = render(<Navbar />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('QuizComponent should not have any accessibility violations', async () => {
    const { container } = render(<QuizComponent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('SmartAssistant should not have any accessibility violations', async () => {
    const { container } = render(<SmartAssistant />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
