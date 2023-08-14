'use client';

import { Form, Input, Button, DatePicker, Switch, Row, Col, Layout, Divider, Select, Card } from 'antd';
import moment from 'moment';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import postalCodes from 'postal-codes-js';
import { getCode } from 'country-list';
import hasOnlyLetters from '@/utils/inputsValidation/checkOnlyLetters';
import checkLength from '@/utils/inputsValidation/checkLength';
import hasMinimumUppercase from '@/utils/inputsValidation/checkUppercaseCount';
import hasMinimumNumbers from '@/utils/inputsValidation/checkNumbersCount';
import hasMinimumLowercase from '@/utils/inputsValidation/checkLowerCaseCount';
import isCertainAge from '@/utils/inputsValidation/checkAge';
import Paths from '../header/header-types';

interface CountryOptionsProps {
  countries: string[];
}

const RegistrationForm: React.FC<CountryOptionsProps> = ({ countries }) => {
  const [form] = Form.useForm();

  const iconStyle = {
    color: 'rgba(0,0,0,.25)',
  };

  const handleFormSubmit = (formData: any) => {
    // eslint-disable-next-line no-console
    console.log('Form data', formData);
  };

  return (
    <Layout>
      <Layout.Content>
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
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
                <Divider orientation="center">Personal</Divider>

                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'Name must have at least one character',
                    },
                    {
                      validator: (_, value) => {
                        if (!hasOnlyLetters(value)) {
                          return Promise.reject(new Error('Name can only contain letters'));
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input placeholder="John" />
                </Form.Item>

                <Form.Item
                  label="Surname"
                  name="surname"
                  required={true}
                  rules={[
                    {
                      validator: (_, value) => {
                        if (!value) {
                          return Promise.reject(new Error('Surname must have at least one character'));
                        }
                        if (!hasOnlyLetters(value)) {
                          return Promise.reject(new Error('Surname can only contain letters'));
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input placeholder="Smith" />
                </Form.Item>

                <Row gutter={16}>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      label="Date of Birth"
                      name="date-of-birth"
                      required={true}
                      rules={[
                        {
                          validator: (_, value) => {
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
                    >
                      <DatePicker
                        style={{ width: '100%' }}
                        format="YYYY-MM-DD"
                        placeholder="1990-03-20"
                        disabledDate={(current) => current && current > moment().endOf('day')}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item label="Gender" name="gender">
                      <Select placeholder="Select Gender">
                        <Select.Option value="female">Female</Select.Option>
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="other">Other</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Divider orientation="center">Address</Divider>

                <Form.Item
                  label="Street"
                  name="street"
                  rules={[
                    {
                      validator: (_, value) => {
                        if (!value || value.length === 0) {
                          return Promise.reject(new Error('Street name must contain at least one character'));
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input placeholder="Park Avenue" />
                </Form.Item>

                <Row gutter={16}>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item label="House" name="house">
                      <Input placeholder="34" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item label="Flat" name="flat">
                      <Input placeholder="128" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      label="Country"
                      name="country"
                      rules={[
                        {
                          required: true,
                          message: 'Please select the country from list',
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select Country"
                        onChange={() => {
                          form.validateFields(['postal-code']);
                        }}
                      >
                        {countries.map((country) => (
                          <Select.Option key={country} value={country}>
                            {country}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      label="Postal Code"
                      name="postal-code"
                      required={true}
                      rules={[
                        {
                          validator: (_, value) => {
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
                    >
                      <Input placeholder="4701" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item name="set-default-address" valuePropName="checked">
                  <Row align="middle">
                    <Col>
                      <Switch defaultChecked={true} />
                    </Col>
                    <Col>
                      <span style={{ marginLeft: '8px' }}>Set as default address</span>
                    </Col>
                  </Row>
                </Form.Item>

                <Divider orientation="center">Credentials</Divider>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your e-mail',
                    },
                    {
                      type: 'email',
                      message: 'Your e-mail is incorrectly formatted',
                    },
                  ]}
                >
                  <Input prefix={<MailOutlined style={iconStyle} />} placeholder="your.email@gmail.com" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  required={true}
                  rules={[
                    {
                      validator: (_, value) => {
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
                  hasFeedback
                >
                  <Input.Password prefix={<LockOutlined style={iconStyle} />} placeholder="securePassword1" />
                </Form.Item>

                <Form.Item style={{ textAlign: 'center' }}>
                  <Button type="primary" htmlType="submit">
                    Register
                  </Button>
                </Form.Item>
                <Divider />

                <div style={{ textAlign: 'center' }}>
                  Already registered?
                  <Button type="link" href={Paths.LOGIN}>
                    Login
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export default RegistrationForm;
