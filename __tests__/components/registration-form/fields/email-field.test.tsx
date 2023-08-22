import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EmailField from '../../../../components/registration-form/fields/email-field';

jest.mock('antd', () => ({
  Form: {
    Item: ({ children, name }: any) => <div data-testid={`form-item-${name}`}>{children}</div>,
  },
  Input: ({ prefix, placeholder }: any) => (
    <div>
      {prefix}
      <input data-testid="email-input" data-placeholder={placeholder} />
    </div>
  ),
}));

jest.mock('@ant-design/icons', () => ({
  MailOutlined: () => <div data-testid="mail-icon">Icon</div>,
}));

describe('EmailField Component', () => {
  test('renders EmailField correctly with provided props', () => {
    render(
      <EmailField
        label="Test Email"
        name="testEmail"
        placeholder="test.email@gmail.com"
        rules={[{ required: true, message: 'Please input your email!' }]}
        iconStyle={{ color: 'red' }}
      />,
    );

    expect(screen.getByTestId('form-item-testEmail')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toHaveAttribute('data-placeholder', 'test.email@gmail.com');
    expect(screen.getByTestId('mail-icon')).toBeInTheDocument();
  });

  test('renders EmailField with default props when not provided', () => {
    render(<EmailField name="defaultEmail" />);

    expect(screen.getByTestId('form-item-defaultEmail')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toHaveAttribute('data-placeholder', 'your.email@gmail.com');
    expect(screen.getByTestId('mail-icon')).toBeInTheDocument();
  });
});
