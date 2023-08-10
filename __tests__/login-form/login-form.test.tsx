import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginForm from '../../components/login-form/login-form';
import { Placeholders, ValidationMessages } from '../../components/login-form/enums.login-form';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

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

  it(`${TestMessage.InvalidEmail} with leading whitespace`, async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText(Placeholders.Email), { target: { value: ' name@gmail.com' } });

    expect(await screen.findByText(ValidationMessages.EmailInvalid)).toBeInTheDocument();
  });

  it(`${TestMessage.InvalidEmail} with trailing whitespace`, async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText(Placeholders.Email), { target: { value: 'name@gmail.com ' } });

    expect(await screen.findByText(ValidationMessages.EmailInvalid)).toBeInTheDocument();
  });

  it(`${TestMessage.InvalidEmail} without @`, async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText(Placeholders.Email), { target: { value: 'namegmail.com' } });

    expect(await screen.findByText(ValidationMessages.EmailInvalid)).toBeInTheDocument();
  });

  it(`${TestMessage.InvalidEmail} with two @`, async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText(Placeholders.Email), { target: { value: 'na@me@gmail.com' } });

    expect(await screen.findByText(ValidationMessages.EmailInvalid)).toBeInTheDocument();
  });

  it(`${TestMessage.InvalidEmail} without domain`, async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText(Placeholders.Email), { target: { value: 'name@gmail' } });

    expect(await screen.findByText(ValidationMessages.EmailInvalid)).toBeInTheDocument();
  });
});

describe('LoginForm - password validation', () => {
  it(`${TestMessage.ValidCase} password`, async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText(Placeholders.Password), { target: { value: '12345sS' } });

    await waitFor(() => {
      expect(screen.getByText(ValidationMessages.PasswordPattern.replace(/\s\s+/g, ' '))).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText(Placeholders.Password), { target: { value: '12345sS!' } });

    await waitFor(() => {
      expect(screen.queryByText(ValidationMessages.PasswordPattern.replace(/\s\s+/g, ' '))).not.toBeInTheDocument();
    });
  });

  it(`${TestMessage.InvalidPassword} if less than 8 characters were used`, async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText(Placeholders.Password), { target: { value: '1234sS!' } });

    expect(await screen.findByText(ValidationMessages.PasswordPattern.replace(/\s\s+/g, ' '))).toBeInTheDocument();
  });

  it(`${TestMessage.InvalidPassword} with leading whitespace`, async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText(Placeholders.Password), { target: { value: ' sS1!sS1!' } });

    expect(await screen.findByText(ValidationMessages.PasswordPattern.replace(/\s\s+/g, ' '))).toBeInTheDocument();
  });

  it(`${TestMessage.InvalidPassword} with trailing whitespace`, async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText(Placeholders.Password), { target: { value: 'sS1!sS1! ' } });

    expect(await screen.findByText(ValidationMessages.PasswordPattern.replace(/\s\s+/g, ' '))).toBeInTheDocument();
  });

  it(`${TestMessage.InvalidPassword} without lowercase character`, async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText(Placeholders.Password), { target: { value: 'SS1!SS1!S' } });

    expect(await screen.findByText(ValidationMessages.PasswordPattern.replace(/\s\s+/g, ' '))).toBeInTheDocument();
  });

  it(`${TestMessage.InvalidPassword} without uppercase character`, async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText(Placeholders.Password), { target: { value: 'ss1!ss1!s' } });

    expect(await screen.findByText(ValidationMessages.PasswordPattern.replace(/\s\s+/g, ' '))).toBeInTheDocument();
  });

  it(`${TestMessage.InvalidPassword} without digit character`, async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText(Placeholders.Password), { target: { value: 'ssS!ssS!s' } });

    expect(await screen.findByText(ValidationMessages.PasswordPattern.replace(/\s\s+/g, ' '))).toBeInTheDocument();
  });

  it(`${TestMessage.InvalidPassword} without special character`, async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText(Placeholders.Password), { target: { value: 'ssSsssS1s' } });

    expect(await screen.findByText(ValidationMessages.PasswordPattern.replace(/\s\s+/g, ' '))).toBeInTheDocument();
  });
});
