import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders welcome message', () => {
  render(<App />);
  const linkElement = screen.getByText(/This is a sample React application with tests/i);
  expect(linkElement).toBeInTheDocument();
});
