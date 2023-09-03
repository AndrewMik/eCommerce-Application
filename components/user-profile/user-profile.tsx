'use client';

import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Layout, Card, Switch } from 'antd';
import { Customer } from '@commercetools/platform-sdk';
import updateCustomer from '@/pages/api/update-customer';
import getClient from '@/pages/api/get-client';
import PersonalSection from '../registration-form/sections/personal-section';
import { FormData } from '../registration-form/helpers/registration.types';
import AddressProfileSection from './address-profile-section';
import DividerText from '../registration-form/fields/divider-field';
import setFormData from './helpers/set-form-data';
import { CountryOptionsProps } from '../registration-form/helpers/interface';
import EmailField from '../registration-form/fields/email-field';
import fieldDefinitions from '../registration-form/helpers/field-definitions';
import { getEmailRules } from '../registration-form/helpers/validation-rules';
import InputField from '../registration-form/fields/input-field';

const Profile: React.FC<CountryOptionsProps> = ({ countries }) => {
  const [form] = Form.useForm();
  // eslint-disable-next-line no-console
  console.log(form.getFieldsValue());
  const [customerData, setCustomerData] = useState<Customer>({
    id: '',
    version: 0,
    createdAt: '',
    lastModifiedAt: '',
    email: '',
    addresses: [],
    isEmailVerified: false,
    authenticationMode: '',
  });
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

  const saveCustomerChanges = async (formData: FormData) => {
    // eslint-disable-next-line no-console
    console.log(form.getFieldsValue());
    await updateCustomer(customerData as Customer, formData as FormData);
    setComponentDisabled(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const customer = await getClient();
      // eslint-disable-next-line no-console
      console.log(customer);
      setCustomerData(customer as Customer);
      setFormData(form, customer as Customer);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <Layout>
      <Layout.Content>
        <Row justify="center" align="middle">
          <Col xs={22} sm={20} md={18} lg={14} xl={12}>
            <Card bordered style={{ borderRadius: 15, marginBlock: 40 }}>
              <Switch
                checked={!componentDisabled}
                onChange={(checked) => {
                  if (!checked) {
                    setFormData(form, customerData as Customer);
                  }
                  setComponentDisabled(!checked);
                }}
              ></Switch>
              <span style={{ marginLeft: 8 }}>Edit mode</span>
              <Form
                form={form}
                name="user-profile-form"
                initialValues={{
                  remember: true,
                }}
                autoComplete="on"
                layout="vertical"
                disabled={componentDisabled}
                onFinish={saveCustomerChanges}
              >
                <PersonalSection componentDisabled={componentDisabled} form={form}></PersonalSection>
                {!componentDisabled && <EmailField {...fieldDefinitions.email} rules={getEmailRules()} />}
                {componentDisabled && (
                  <InputField
                    {...fieldDefinitions.email}
                    componentDisabled={componentDisabled}
                    required={true}
                    rules={getEmailRules()}
                  />
                )}
                <DividerText text="Addresses"></DividerText>
                {customerData.addresses &&
                  customerData.addresses.map((address, index) => {
                    if (!address.id) {
                      return null;
                    }
                    const { id } = address;
                    const isDefaultShipping = customerData.defaultShippingAddressId === id;
                    const isDefaultBilling = customerData.defaultBillingAddressId === id;
                    const isShipping = customerData.shippingAddressIds
                      ? customerData.shippingAddressIds.includes(id)
                      : false;
                    const isBilling = customerData.billingAddressIds
                      ? customerData.billingAddressIds.includes(id)
                      : false;

                    return (
                      <AddressProfileSection
                        key={index}
                        countries={countries}
                        form={form}
                        nameSuffix={id}
                        componentDisabled={componentDisabled}
                        isShipping={isShipping}
                        isBilling={isBilling}
                        isDefaultShipping={isDefaultShipping}
                        isDefaultBilling={isDefaultBilling}
                      />
                    );
                  })}
                <Form.Item style={{ textAlign: 'center' }}>
                  <Button type="primary" htmlType="submit">
                    Save Changes
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export default Profile;
