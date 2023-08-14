'use client';

import { Form, Button, Row, Col, Layout, Card } from 'antd';
import postalCodes from 'postal-codes-js';
import { getCode } from 'country-list';
import hasOnlyLetters from '@/utils/inputsValidation/checkOnlyLetters';
import checkLength from '@/utils/inputsValidation/checkLength';
import hasMinimumUppercase from '@/utils/inputsValidation/checkUppercaseCount';
import hasMinimumNumbers from '@/utils/inputsValidation/checkNumbersCount';
import hasMinimumLowercase from '@/utils/inputsValidation/checkLowerCaseCount';
import isCertainAge from '@/utils/inputsValidation/checkAge';

import InputField from './fields/input-field';
import DateField from './fields/date-field';
import SelectField from './fields/select-field';
import SwitchField from './fields/switch-field';
import DividerText from './fields/divider-field';
import EmailField from './fields/email-field';
import PasswordField from './fields/password-field';
import Footer from './fields/footer';
import Paths from '../header/header-types';

interface CountryOptionsProps {
  countries: string[];
}

const RegistrationForm: React.FC<CountryOptionsProps> = ({ countries }) => {
  const [form] = Form.useForm();

  // TODO: don't forget to remove
  const handleFormSubmit = (formData: object) => {
    // eslint-disable-next-line no-console
    console.log('Form data', formData);
  };

  return (
    <Layout>
      <Layout.Content>
        <Row justify="center" align="middle">
          <Col xs={22} sm={20} md={18} lg={14} xl={12}>
            <Card bordered style={{ borderRadius: '15px', marginBlock: '40px' }}>
              <Form
                form={form}
                name="register-form"
                initialValues={{ remember: true }}
                autoComplete="on"
                layout="vertical"
                onFinish={handleFormSubmit}
              >
                <DividerText text="Personal"></DividerText>

                <InputField
                  label="Name"
                  name="name"
                  placeholder="John"
                  rules={[
                    {
                      required: true,
                      message: 'Name must have at least one character',
                    },
                    {
                      validator: (_: string, value: string) => {
                        if (!hasOnlyLetters(value)) {
                          return Promise.reject(new Error('Name can only contain letters'));
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                />
                <InputField
                  label="Surname"
                  name="surname"
                  placeholder="Smith"
                  rules={[
                    {
                      required: true,
                      message: 'Surname must have at least one character',
                    },
                    {
                      validator: (_: string, value: string) => {
                        if (!hasOnlyLetters(value)) {
                          return Promise.reject(new Error('Surname can only contain letters'));
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                />

                <Row gutter={16}>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <DateField
                      label="Date of Birth"
                      name="date-of-birth"
                      placeholder="1990-03-20"
                      rules={[
                        {
                          validator: (_: string, value: string) => {
                            if (!value) {
                              return Promise.reject(new Error('Please input your date of birth'));
                            }
                            if (!isCertainAge(value, 13)) {
                              return Promise.reject(new Error('You should be at least 13 years old to register'));
                            }
                            return Promise.resolve();
                          },
                        },
                      ]}
                    />
                  </Col>

                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <SelectField
                      label="Gender"
                      name="gender"
                      placeholder="Select Gender"
                      options={[
                        { value: 'female', label: 'Female' },
                        { value: 'male', label: 'Male' },
                        { value: 'other', label: 'Other' },
                      ]}
                      rules={[]}
                    />
                  </Col>
                </Row>

                <DividerText text="Address"></DividerText>

                <InputField
                  label="Street"
                  name="street"
                  placeholder="Park Avenue"
                  required={true}
                  rules={[
                    {
                      validator: (_: string, value: string) => {
                        if (!value || value.length === 0) {
                          return Promise.reject(new Error('Street name must contain at least one character'));
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                ></InputField>

                <Row gutter={16}>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <InputField label="House" name="house" placeholder="34" rules={[]}></InputField>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <InputField label="Flat" name="flat" placeholder="128" rules={[]}></InputField>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <SelectField
                      label="Country"
                      name="country"
                      placeholder="Select Country"
                      options={countries.map((country) => ({ value: country, label: country }))}
                      rules={[
                        {
                          required: true,
                          message: 'Please select the country from list',
                        },
                      ]}
                      required={true}
                      onChange={() => form.validateFields(['postal-code'])}
                    />
                  </Col>

                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <InputField
                      label="Postal code"
                      name="postal-code"
                      placeholder="4701"
                      rules={[
                        {
                          validator: (_: string, value: string) => {
                            const countryName = form.getFieldValue('country');
                            const countryCode = countryName ? getCode(countryName) : null;

                            if (!value) {
                              return Promise.reject(new Error(`Please input postal code`));
                            }
                            if (!countryCode) {
                              return Promise.reject(new Error(`Please choose country`));
                            }
                            if (postalCodes.validate(countryCode, value) !== true) {
                              if (countryName) {
                                return Promise.reject(new Error(`Invalid postal code format for ${countryName}`));
                              }
                              return Promise.reject(new Error('Invalid postal code'));
                            }
                            return Promise.resolve();
                          },
                        },
                      ]}
                      required={true}
                    ></InputField>
                  </Col>
                </Row>

                <SwitchField
                  name="set-default-address"
                  label="Set as default address"
                  defaultChecked={true}
                ></SwitchField>

                <DividerText text="Credentials"></DividerText>

                <EmailField
                  name="email"
                  placeholder="your.email@gmail.com"
                  rules={[
                    { required: true, message: 'Please input your e-mail' },
                    { type: 'email', message: 'Your e-mail is incorrectly formatted' },
                  ]}
                />

                <PasswordField
                  name="password"
                  placeholder="securePassword1"
                  rules={[
                    {
                      validator: (_: string, value: string) => {
                        if (!value) {
                          return Promise.reject(new Error('Please input your password'));
                        }
                        if (!checkLength(8, value)) {
                          return Promise.reject(new Error('Password must have at least 8 characters'));
                        }
                        if (!hasMinimumLowercase(value, 1)) {
                          return Promise.reject(new Error('Password must have at least 1 lowercase character'));
                        }
                        if (!hasMinimumUppercase(value, 1)) {
                          return Promise.reject(new Error('Password must have at least 1 uppercase character'));
                        }
                        if (!hasMinimumNumbers(value, 1)) {
                          return Promise.reject(new Error('Password must have at least 1 number character'));
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                />

                <Form.Item style={{ textAlign: 'center' }}>
                  <Button type="primary" htmlType="submit">
                    Register
                  </Button>
                </Form.Item>
                <Footer href={Paths.LOGIN} />
              </Form>
            </Card>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export default RegistrationForm;
