import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PasswordField from '../../../../components/registration-form/fields/password-field';

jest.mock('antd', () => ({
  Form: {
    Item: ({ children, label, hasFeedback }: { children: React.ReactNode; label: string; hasFeedback: boolean }) => (
      <div data-testid="mocked-form-item" data-feedback={hasFeedback}>
        <label data-testid="mocked-label">{label}</label>
        {children}
      </div>
    ),
  },
  Input: {
    Password: ({ prefix, placeholder }: { prefix: React.ReactNode; placeholder: string }) => (
      <div data-testid="mocked-input-password">
        {prefix}
        <input placeholder={placeholder} type="password" />
      </div>
    ),
  },
}));

jest.mock('@ant-design/icons', () => ({
  LockOutlined: () => <span data-testid="lock-icon">lock-icon</span>,
}));

describe('PasswordField', () => {
  it('renders correctly with given props', () => {
    const testProps = {
      label: 'Test Password',
      name: 'testPassword',
      placeholder: 'Enter your password...',
      rules: [],
    };

    render(<PasswordField {...testProps} />);

    const inputElement = screen.getByPlaceholderText(testProps.placeholder);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('placeholder', testProps.placeholder);
    expect(inputElement).toHaveAttribute('type', 'password');

    const labelElement = screen.getByTestId('mocked-label');
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveTextContent(testProps.label);

    const lockIcon = screen.getByTestId('lock-icon');
    expect(lockIcon).toBeInTheDocument();
    expect(lockIcon).toHaveTextContent('lock-icon');

    const formItem = screen.getByTestId('mocked-form-item');
    expect(formItem).toHaveAttribute('data-feedback', 'false');
  });

  it('sets feedback attribute when hasFeedback prop is provided', () => {
    const testProps = {
      label: 'Test Password',
      name: 'testPassword',
      placeholder: 'Enter your password...',
      rules: [],
      hasFeedback: true,
    };

    render(<PasswordField {...testProps} />);

    const formItem = screen.getByTestId('mocked-form-item');
    expect(formItem).toHaveAttribute('data-feedback', 'true');
  });
});
