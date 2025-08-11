import { render, screen } from '@testing-library/react';
import App from './components/App';

test('checks for page title, input field, and process button on initial render', () => {
  render(<App />);
  const pageTitle = screen.getByText(/AI Writing Assistant/i);
  const processButton = screen.getByText(/Process/i);
  const textField = screen.getByLabelText(/Enter Text/i);
  expect(pageTitle).toBeInTheDocument();
  expect(processButton).toBeInTheDocument();
  expect(textField).toBeInTheDocument();
});
