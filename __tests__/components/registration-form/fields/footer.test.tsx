import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FooterMessage from '../../../../components/registration-form/fields/footer';

jest.mock('antd', () => ({
  Divider: () => <div data-testid="mocked-divider"></div>,
  Row: ({ children }: { children: React.ReactNode }) => <div data-testid="mocked-row">{children}</div>,
  Col: ({ children }: { children: React.ReactNode }) => <div data-testid="mocked-col">{children}</div>,
}));

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a data-testid="mocked-link" href={href}>
      {children}
    </a>
  );
});

describe('FooterMessage', () => {
  it('renders correctly', () => {
    const testHref = '/test-href';

    render(<FooterMessage href={testHref} />);

    expect(screen.getByTestId('mocked-divider')).toBeInTheDocument();
    expect(screen.getByText(/Already registered\?/i)).toBeInTheDocument();

    const linkElement = screen.getByTestId('mocked-link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', testHref);
    expect(linkElement).toHaveTextContent('Sign in here!');
  });
});
