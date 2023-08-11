'use client';

import { useEffect } from 'react';
import { Button, Space } from 'antd';
import { CustomerDraft } from '@commercetools/platform-sdk';
import loginUser from '@/api/login-user';
import registerUser from '@/api/register-user';

const Page = (): JSX.Element => {
  // Define a function that logs in the user and console.logs the result
  async function fetchAndLogUser() {
    try {
      const result = await loginUser('example3@example.com', 'securepassword');
      // eslint-disable-next-line no-console
      console.log(result);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }

  // Define a function to register a user and console.log the result
  async function fetchAndLogRegisteredUser() {
    const newUser: CustomerDraft = {
      email: 'example3@example.com',
      password: 'securepassword',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '2000-01-01',
    };

    try {
      // eslint-disable-next-line no-console
      console.log(123);
      const response = await registerUser(newUser);
      // eslint-disable-next-line no-console
      console.log('Registered user:', response);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  }

  useEffect(() => {
    // Define an inner async function
    const performActions = async () => {
      await fetchAndLogRegisteredUser();
      fetchAndLogUser();
    };

    // Call the inner async function
    performActions();
  }, []); // Ensure this hook runs only once when the component mounts

  return (
    <div style={{ padding: '0 24px' }}>
      <Space>
        <Button type="primary">Main Page</Button>
      </Space>
    </div>
  );
};

export default Page;
