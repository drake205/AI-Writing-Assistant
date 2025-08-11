import { render, screen } from '@testing-library/react';
import ResponseArea from './components/ResponseArea';

test('ResponseArea title renders', () => {
    render(<ResponseArea title='Professional'/>);
    const responseAreaTitle = screen.getByText(/Professional/i);
    expect(responseAreaTitle).toBeInTheDocument();
  });
  
  test('ResponseArea title renders', () => {
    render(<ResponseArea text='Example Sentence'/>);
    const responseAreaText = screen.getByText(/Example Sentence/i);
    expect(responseAreaText).toBeInTheDocument();
  });