'use client';

import { useState, useContext } from 'react';
import { Form, Button, Row, Col, Layout, Card } from 'antd';
import { useRouter } from 'next/navigation';
import registerUser from '@/pages/api/register-user';
import Footer from './fields/footer';
import { Paths } from '../../utils/route-links';
import AddressSection from './sections/address-section';
import CredentialsSection from './sections/credentials-section';
import PersonalSection from './sections/personal-section';
import { AddressSuffix, AddressFieldsName, FormData } from './helpers/registration.types';
import { AuthContext } from '../../context/authorization-context';

interface CountryOptionsProps {
  countries: string[];
}

const RegistrationForm: React.FC<CountryOptionsProps> = ({ countries }) => {
  const [form] = Form.useForm();
  const [useBillingAddress, setUseBillingAddress] = useState(false);
  const router = useRouter();
  const {
    setToggleNotificationForRegistration,
    setRegistrationStatusCode,
    saveLogInState,
    setUserToken,
    setIsLoggedIn,
  } = useContext(AuthContext);

  const handleRegisterUser = async (formData: FormData) => {
    const { statusCode, token } = await registerUser(formData);
    if (statusCode === 201) {
      if (token) {
        setUserToken(token);
        saveLogInState(token);
        setIsLoggedIn(true);
        router.push(`/`);
      } else {
        setIsLoggedIn(false);
      }
    }
    setRegistrationStatusCode(statusCode);
    setToggleNotificationForRegistration((prevState) => !prevState);
  };
  return (
    <Layout>
      <Layout.Content>
        <Row justify="center" align="middle">
          <Col xs={22} sm={20} md={18} lg={14} xl={12}>
            <Card bordered style={{ borderRadius: 15, marginBlock: 40 }}>
              <Form
                form={form}
                name="register-form"
                initialValues={{
                  remember: true,
                  [`${AddressFieldsName.SET_AS_DEFAULT}${AddressSuffix.SHIPPING}`]: true,
                  [`${AddressFieldsName.SET_AS_DEFAULT}${AddressSuffix.BILLING}`]: true,
                  [AddressFieldsName.USE_AS_BILLING_ADDRESS]: false,
                }}
                autoComplete="on"
                layout="vertical"
                onFinish={handleRegisterUser}
              >
                <PersonalSection></PersonalSection>
                <AddressSection
                  countries={countries}
                  form={form}
                  title="Shipping Address"
                  nameSuffix={AddressSuffix.SHIPPING}
                  showCheckbox={true}
                  onUseBillingAddressChange={setUseBillingAddress}
                />
                {!useBillingAddress && (
                  <AddressSection
                    countries={countries}
                    form={form}
                    title="Billing Address"
                    nameSuffix={AddressSuffix.BILLING}
                  />
                )}{' '}
                <CredentialsSection></CredentialsSection>
                <Form.Item style={{ textAlign: 'center' }}>
                  <Button type="primary" htmlType="submit">
                    Sign up
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
