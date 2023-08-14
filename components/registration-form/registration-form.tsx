'use client';

import { Form, Button, Row, Col, Layout, Card } from 'antd';

import {
  getNameRules,
  getSurnameRules,
  getBirthDateRules,
  getStreetRules,
  getCountryRules,
  getEmailRules,
  getPasswordRules,
  getPostalCodeRules,
} from './helpers/validation-rules';

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

                <InputField label="Name" name="name" placeholder="John" rules={getNameRules()} />
                <InputField label="Surname" name="surname" placeholder="Smith" rules={getSurnameRules()} />

                <Row gutter={16}>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <DateField
                      label="Date of Birth"
                      name="date-of-birth"
                      placeholder="1990-03-20"
                      rules={getBirthDateRules()}
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
                  rules={getStreetRules()}
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
                      rules={getCountryRules()}
                      required={true}
                      onChange={() => form.validateFields(['postal-code'])}
                    />
                  </Col>

                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <InputField
                      label="Postal code"
                      name="postal-code"
                      placeholder="4701"
                      rules={getPostalCodeRules(form)}
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

                <EmailField name="email" placeholder="your.email@gmail.com" rules={getEmailRules()} />

                <PasswordField name="password" placeholder="securePassword1" rules={getPasswordRules()} />

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
