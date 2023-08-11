import { render, screen, waitFor } from '@testing-library/react';
import { ImgHTMLAttributes } from 'react';
import MainHeader from '../components/header/header';
import '@testing-library/jest-dom/extend-expect';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: ImgHTMLAttributes<HTMLImageElement>) => {
    return <img {...props} />;
  },
}));

window.matchMedia =
  window.matchMedia ||
  function matchMediaPolyfill() {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };

describe('MainHeader Component', () => {
  const menuLabels = ['Home', 'Sign in', 'Sign up', 'Catalog', 'Cart'];
  it('renders logo correctly', async () => {
    render(<MainHeader />);
    await waitFor(() => {
      const logoImage = screen.getByAltText('Kiddo Kingdom');
      expect(logoImage).toBeInTheDocument();
    });
  });

  it('renders horizontal menu with correct items in desktop view', async () => {
    render(<MainHeader />);
    await waitFor(() => {
      menuLabels.forEach((label) => {
        expect(screen.getByText(label)).toBeInTheDocument();
      });
    });
  });
}); // Add this line
