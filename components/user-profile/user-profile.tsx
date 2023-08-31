'use client';

import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Layout, Card, Checkbox } from 'antd';
import { Customer } from '@commercetools/platform-sdk';
import updateCustomer from '@/pages/api/update-customer';
import getClient from '@/pages/api/get-client';
import PersonalSection from '../registration-form/sections/personal-section';
import { AddressSuffix, FormData } from '../registration-form/helpers/registration.types';
import AddressSection from '../registration-form/sections/address-section';
import DividerText from '../registration-form/fields/divider-field';
import setFormData from './helpers/set-form-data';
import { CountryOptionsProps } from '../registration-form/helpers/interface';
import EmailField from '../registration-form/fields/email-field';
import fieldDefinitions from '../registration-form/helpers/field-definitions';
import { getEmailRules } from '../registration-form/helpers/validation-rules';
import InputField from '../registration-form/fields/input-field';

const Profile: React.FC<CountryOptionsProps> = ({ countries }) => {
  const [form] = Form.useForm();
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
    await updateCustomer(customerData as Customer, form, formData as FormData);
  };

  useEffect(() => {
    const fetchData = async () => {
      const customer = await getClient();
      await setCustomerData(customer as Customer);
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
              <Checkbox
                checked={!componentDisabled}
                onChange={(e) => {
                  const isEditMode = e.target.checked;
                  if (!isEditMode) {
                    setFormData(form, customerData as Customer);
                  }
                  setComponentDisabled(!isEditMode);
                }}
              >
                Edit
              </Checkbox>
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
                {/* this code creates required number of shipping addresses, but the data is not arranged in array on form submit */}
                {customerData.shippingAddressIds?.map((_, index) => (
                  <AddressSection
                    key={index}
                    countries={countries}
                    form={form}
                    title="Shipping Address"
                    nameSuffix={AddressSuffix.SHIPPING}
                    showCheckbox={true}
                    componentDisabled={componentDisabled}
                  />
                ))}
                {/* example with users
                <Form.List name="users">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                          <Form.Item
                            {...restField}
                            name={[name, 'first']}
                            rules={[{ required: true, message: 'Missing first name' }]}
                          >
                            <Input placeholder="First Name" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'last']}
                            rules={[{ required: true, message: 'Missing last name' }]}
                          >
                            <Input placeholder="Last Name" />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                          Add field
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List> 
                */}
                {/* this code will be required for EA-103 */}
                <Form.List name="shippingAddresses">
                  {(fields, { add }) => (
                    <>
                      {/* this code creates required number of addresses, but is not added to fields 
                      {customerData.shippingAddressIds?.map((_, index) => (
                        <AddressSection
                          key={index}
                          index={index}
                          countries={countries}
                          form={form}
                          title="Shipping Address"
                          nameSuffix={AddressSuffix.SHIPPING}
                          showCheckbox={true}
                          componentDisabled={componentDisabled}
                        />
                      ))} */}
                      {fields.map(({ key }) => (
                        <AddressSection
                          countries={countries}
                          form={form}
                          title="Shipping Address"
                          nameSuffix={AddressSuffix.SHIPPING}
                          showCheckbox={true}
                          componentDisabled={componentDisabled}
                          key={key}
                        />
                      ))}
                      <Form.Item>
                        <Button onClick={() => add()}>Add Shipping Address</Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
                {customerData.shippingAddressIds?.map((_, index) => (
                  <AddressSection
                    key={index}
                    countries={countries}
                    form={form}
                    title="Billing Address"
                    nameSuffix={AddressSuffix.BILLING}
                    componentDisabled={componentDisabled}
                  />
                ))}
                {/* this code will be required for EA-103 */}
                <Form.List name="billingAddresses">
                  {(fields, { add }) => (
                    <>
                      {fields.map(({ key }) => (
                        <AddressSection
                          countries={countries}
                          form={form}
                          title="Billing Address"
                          nameSuffix={AddressSuffix.SHIPPING}
                          showCheckbox={true}
                          componentDisabled={componentDisabled}
                          key={key}
                        />
                      ))}
                      <Form.Item>
                        <Button onClick={() => add()}>Add Billing Address</Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
                <DividerText text={''} />
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
