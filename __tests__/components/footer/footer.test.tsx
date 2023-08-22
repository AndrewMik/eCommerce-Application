import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for the "toBeInTheDocument" matcher
import MainFooter from '../../../components/footer/footer'; // adjust the path if needed

describe('MainFooter', () => {
  it('renders the footer with the correct content', () => {
    render(<MainFooter />);

    const footerText = screen.getByText(/Kiddo Kingdom ©2023/i);
    expect(footerText).toBeInTheDocument();
  });

  it('has the expected styles', () => {
    render(<MainFooter />);
    const footerText = screen.getByText(/Kiddo Kingdom ©2023/i);

    expect(footerText).toHaveStyle('text-align: center');
  });
});
