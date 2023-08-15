'use client';

import { useState } from 'react';
import { Form, Button, Row, Col, Layout, Card } from 'antd';

import Footer from './fields/footer';
import Paths from '../header/header-types';

import AddressSection from './sections/address-section';
import CredentialsSection from './sections/credentials-section';
import PersonalSection from './sections/personal-section';

interface CountryOptionsProps {
  countries: string[];
}

const RegistrationForm: React.FC<CountryOptionsProps> = ({ countries }) => {
  const [form] = Form.useForm();
  const [useBillingAddress, setUseBillingAddress] = useState(false);

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
                <PersonalSection></PersonalSection>
                <AddressSection
                  countries={countries}
                  form={form}
                  title="Shipping Address"
                  nameSuffix="_shipping"
                  showCheckbox={true}
                  onUseBillingAddressChange={setUseBillingAddress}
                />
                {!useBillingAddress && (
                  <AddressSection countries={countries} form={form} title="Billing Address" nameSuffix="_billing" />
                )}{' '}
                <CredentialsSection></CredentialsSection>
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
