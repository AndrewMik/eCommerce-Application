import { render, screen, waitFor } from '@testing-library/react';
import MainHeader from '../../../components/header/header';
import '@testing-library/jest-dom/extend-expect';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: JSX.IntrinsicElements['img'] & { priority?: boolean }) => {
    const { priority, ...imgProps } = props;
    return <img {...imgProps} />;
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
});
