import { render, screen } from '@testing-library/react';
import App from './App';

describe('App shell', () => {
  it('renders the landing experience', () => {
    render(<App />);
    expect(screen.getByText(/Premium explainable care intelligence/i)).toBeInTheDocument();
  });
});
