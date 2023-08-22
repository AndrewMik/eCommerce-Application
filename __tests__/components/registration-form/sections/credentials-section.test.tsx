import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Form } from 'antd';
import CredentialsSection from '../../../../components/registration-form/sections/credentials-section';

window.matchMedia =
  window.matchMedia ||
  function matchMediaPolyfill() {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };

describe('CredentialsSection', () => {
  const WrappedCredentialsSection = () => (
    <Form>
      <CredentialsSection />
    </Form>
  );

  it('renders without crashing', () => {
    render(<WrappedCredentialsSection />);
    const credentialsDivider = screen.getByText('Credentials');
    expect(credentialsDivider).toBeInTheDocument();
  });

  it('renders the email field correctly', () => {
    render(<WrappedCredentialsSection />);
    const emailLabel = screen.getByText('Email');
    const emailInput = screen.getByPlaceholderText('your.email@gmail.com');

    expect(emailLabel).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });

  it('renders the password field correctly', () => {
    render(<WrappedCredentialsSection />);
    const passwordLabel = screen.getByText('Password');
    const passwordInput = screen.getByPlaceholderText('securePassword1!');

    expect(passwordLabel).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });
});
