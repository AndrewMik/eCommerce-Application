import { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DividerText from '../../../../components/registration-form/fields/divider-field';

jest.mock('antd', () => ({
  Divider: ({ children }: { children?: ReactNode }) => <div data-testid="mocked-divider">{children}</div>,
}));

describe('<DividerText />', () => {
  it('renders the provided text', () => {
    const mockText = 'Test Divider Text';

    render(<DividerText text={mockText} />);

    const dividerElement = screen.getByTestId('mocked-divider');
    expect(dividerElement).toBeInTheDocument();
    expect(dividerElement).toHaveTextContent(mockText);
  });
});
