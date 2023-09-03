'use client';

import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Layout, Card, Checkbox, App } from 'antd';
import { Customer } from '@commercetools/platform-sdk';
import getClient from '@/pages/api/get-client';
import updatePassword from '@/pages/api/update-password';
import PersonalSection from '../registration-form/sections/personal-section';
import { AddressSuffix } from '../registration-form/helpers/registration.types';
import AddressSection from '../registration-form/sections/address-section';
import DividerText from '../registration-form/fields/divider-field';
import setFormData from './helpers/set-form-data';
import { CountryOptionsProps } from '../registration-form/helpers/interface';
import EmailField from '../registration-form/fields/email-field';
import fieldDefinitions from '../registration-form/helpers/field-definitions';
import { confirmPasswordRules, getEmailRules, getPasswordRules } from '../registration-form/helpers/validation-rules';
import InputField from '../registration-form/fields/input-field';
import PasswordField from '../registration-form/fields/password-field';

type PasswordChangeFormData = {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
};

const Profile: React.FC<CountryOptionsProps> = ({ countries }) => {
  const { notification } = App.useApp();
  const [form] = Form.useForm();
  const [customerData, setCustomerData] = useState({});
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

  const changePassword = async (formData: PasswordChangeFormData) => {
    const response = await updatePassword(
      (customerData as Customer).version,
      formData.currentPassword,
      formData.newPassword,
      (customerData as Customer).email,
    );

    if (response.statusCode === 200) {
      notification.success({
        message: `Password was updated successfully!`,
      });
      const fetchData = async () => {
        const customer = await getClient();
        await setCustomerData(customer);
      };

      fetchData().catch(console.error);
    } else {
      notification.error({
        message: `Password change failed!`,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const customer = await getClient();
      await setCustomerData(customer);
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
                <AddressSection
                  countries={countries}
                  form={form}
                  title="Shipping Address"
                  nameSuffix={AddressSuffix.SHIPPING}
                  showCheckbox={true}
                  componentDisabled={componentDisabled}
                />
                <AddressSection
                  countries={countries}
                  form={form}
                  title="Billing Address"
                  nameSuffix={AddressSuffix.BILLING}
                  componentDisabled={componentDisabled}
                />
                <DividerText text={''} />
                <Form.Item style={{ textAlign: 'center' }}>
                  <Button type="primary" htmlType="submit">
                    Save Changes
                  </Button>
                </Form.Item>
              </Form>
              <div style={{ marginTop: 100 }}></div>
              <DividerText text={'Change Password'} />
              <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                name="user-password-form"
                initialValues={{
                  remember: true,
                }}
                autoComplete="on"
                onFinish={changePassword}
              >
                <div style={{ marginBottom: 20 }}>To change the password for your account, use this form.</div>
                <PasswordField
                  {...fieldDefinitions.password}
                  label="Current password"
                  name="currentPassword"
                  rules={getPasswordRules()}
                />
                <PasswordField
                  {...fieldDefinitions.password}
                  label="New password"
                  name="newPassword"
                  rules={getPasswordRules()}
                />
                <PasswordField
                  {...fieldDefinitions.password}
                  label="Reenter new password"
                  name="newPasswordConfirmation"
                  rules={confirmPasswordRules()}
                />
                <Form.Item style={{ textAlign: 'center' }} wrapperCol={{ span: 24 }}>
                  <Button type="primary" htmlType="submit" style={{ marginTop: 25 }}>
                    Change Password
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
