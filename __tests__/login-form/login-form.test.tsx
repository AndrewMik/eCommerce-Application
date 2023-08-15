import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import mockMatchMedia from '../../utils/mock';
import LoginForm from '../../components/login-form/login-form';
import { Placeholders, ValidationMessages } from '../../components/login-form/types.login';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation');

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    push: jest.fn(),
    pathname: '',
  });
});

const formatMessage = (message: string): string => message.replace(/\s\s+/g, ' ');

mockMatchMedia();

enum TestMessage {
  InvalidPassword = 'displays validation message for invalid password format',
  InvalidEmail = 'displays validation message for invalid email format',
  ValidCase = `doesn't display validation message for valid`,
}

describe('LoginForm - basic tests', () => {
  it('renders the form fields with correct placeholders', () => {
    render(<LoginForm />);

    expect(screen.getByPlaceholderText(Placeholders.Email)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(Placeholders.Password)).toBeInTheDocument();
  });

  it('displays validation messages for required fields', async () => {
    render(<LoginForm />);

    fireEvent.click(screen.getByText('Log in'));

    expect(await screen.findByText(ValidationMessages.EmailRequired)).toBeInTheDocument();
    expect(await screen.findByText(ValidationMessages.PasswordRequired)).toBeInTheDocument();
  });
});

describe('LoginForm - email validation', () => {
  it(`${TestMessage.ValidCase} email`, async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText(Placeholders.Email), { target: { value: 'testtest.com' } });

    await waitFor(() => {
      expect(screen.getByText(ValidationMessages.EmailInvalid)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText(Placeholders.Email), { target: { value: 'test@test.com' } });

    await waitFor(() => {
      expect(screen.queryByText(ValidationMessages.EmailInvalid)).not.toBeInTheDocument();
    });
  });

  test.each([
    [`${TestMessage.InvalidEmail} with leading whitespace`, ' name@gmail.com'],
    [`${TestMessage.InvalidEmail} with trailing whitespace`, 'name@gmail.com '],
    [`${TestMessage.InvalidEmail} without @`, 'namegmail.com'],
    [`${TestMessage.InvalidEmail} with two @`, 'na@me@gmail.com'],
    [`${TestMessage.InvalidEmail} without domain`, 'name@gmail'],
  ])('%s - "%s"', async (_, email) => {
    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText(Placeholders.Email), { target: { value: email } });

    expect(await screen.findByText(ValidationMessages.EmailInvalid)).toBeInTheDocument();
  });
});

describe('LoginForm - password validation', () => {
  it(`${TestMessage.ValidCase} password`, async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText(Placeholders.Password), { target: { value: '12345sS' } });

    await waitFor(() => {
      expect(screen.getByText(formatMessage(ValidationMessages.PasswordPattern))).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText(Placeholders.Password), { target: { value: '12345sS!' } });

    await waitFor(() => {
      expect(screen.queryByText(formatMessage(ValidationMessages.PasswordPattern))).not.toBeInTheDocument();
    });
  });

  test.each([
    [`${TestMessage.InvalidPassword} if less than 8 characters were used`, '1234sS!'],
    [`${TestMessage.InvalidPassword} with leading whitespace`, ' sS1!sS1!'],
    [`${TestMessage.InvalidPassword} with trailing whitespace`, 'sS1!sS1! '],
    [`${TestMessage.InvalidPassword} without lowercase character`, 'SS1!SS1!S'],
    [`${TestMessage.InvalidPassword} without uppercase character`, 'ss1!ss1!s'],
    [`${TestMessage.InvalidPassword} without digit character`, 'ssS!ssS!s'],
    [`${TestMessage.InvalidPassword} without special character`, 'ssSsssS1s'],
  ])('%s - "%s"', async (_, password) => {
    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText(Placeholders.Password), { target: { value: password } });

    expect(await screen.findByText(formatMessage(ValidationMessages.PasswordPattern))).toBeInTheDocument();
  });
});
