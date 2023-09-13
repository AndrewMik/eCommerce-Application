import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ReactNode } from 'react';
import Collaboration from '../../../../components/about/sections/collaboration';

jest.mock('next/link', () => {
  return ({ children }: { children?: ReactNode }) => {
    return children;
  };
});

jest.mock('next/image', () => {
  return () => <img />;
});

window.matchMedia =
  window.matchMedia ||
  function matchMediaPolyfill() {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };

const mockCollaborationData = 'This is a test collaboration stringxs';

describe('Collaboration', () => {
  it('renders without crashing', () => {
    render(<Collaboration collaboration={mockCollaborationData} />);
    expect(screen.getByText('💪🏻 Collaboration')).toBeInTheDocument();
  });

  it('displays the correct text content', () => {
    render(<Collaboration collaboration={mockCollaborationData} />);

    expect(screen.getByText('Made with ❤️ at')).toBeInTheDocument();
  });

  it('displays the logo image', () => {
    render(<Collaboration collaboration={mockCollaborationData} />);

    const imgElement = screen.getByRole('img');
    expect(imgElement).toBeInTheDocument();
  });
});
