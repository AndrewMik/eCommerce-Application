import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Layout, Card, Switch, App } from 'antd';
import { Customer } from '@commercetools/platform-sdk';
import addNewCustomerAddress from '@/pages/api/add-new-customer-address';
import updateCustomerApiData from '@/pages/api/update-customer-api-data';
import getClient from '@/pages/api/get-client';
import updatePassword from '@/pages/api/update-password';
import setTagsToNewAddress from '@/pages/api/set-tags-to-new-address';
import PersonalSection from '../registration-form/sections/personal-section';
import { FormData, FormDataAddNewAddress } from '../registration-form/helpers/registration.types';
import AddressProfileSection from './address-profile-section';
import DividerText from '../registration-form/fields/divider-field';
import setFormData from './helpers/set-form-data';
import { CountryOptionsProps } from '../registration-form/helpers/interface';
import EmailField from '../registration-form/fields/email-field';
import fieldDefinitions from '../registration-form/helpers/field-definitions';
import { confirmPasswordRules, getEmailRules, getPasswordRules } from '../registration-form/helpers/validation-rules';
import InputField from '../registration-form/fields/input-field';
import PasswordField from '../registration-form/fields/password-field';
import AddAddressModal from './add-address-modal';

type PasswordChangeFormData = {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
};

const Profile: React.FC<CountryOptionsProps> = ({ countries }) => {
  const { notification } = App.useApp();
  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [customerData, setCustomerData] = useState<Customer | null>(null);

  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

  const updateCustomer = (customer: Customer, oldForm = form) => {
    setCustomerData(customer);
    setFormData(oldForm, customer);
  };

  const updateCustomerData = async () => {
    const customer = await getClient();
    updateCustomer(customer as Customer);
    return customer as Customer;
  };

  const saveCustomerChanges = async (formData: FormData) => {
    try {
      const response = await updateCustomerApiData(customerData!, formData);
      updateCustomer(response.body);
      setComponentDisabled(true);
      notification.success({
        message: `User data successfully updated!`,
      });
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to save personal data',
      });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const addNewAddress = async (formData: FormDataAddNewAddress) => {
    try {
      const customer = await addNewCustomerAddress(customerData!, formData);
      const response = await setTagsToNewAddress(customer, formData);

      notification.success({
        message: `New address added!`,
      });
      updateCustomer(response);
    } catch (error) {
      notification.error({
        message: `Failed to add the address`,
      });
    } finally {
      handleCancel();
      setComponentDisabled(true);
    }
  };

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
        setCustomerData(customer as Customer);
      };

      fetchData().catch(console.error);
    } else if (response.statusCode === 400) {
      notification.error({
        message: `The given current password doesn't match, try once again!`,
      });
    } else {
      notification.error({
        message: `Password change failed!`,
      });
    }
  };

  useEffect(() => {
    updateCustomerData();
  }, []);

  return (
    <Layout>
      <Layout.Content>
        {isModalVisible && (
          <AddAddressModal
            handleCancel={handleCancel}
            addNewAddress={addNewAddress}
            updateCustomer={updateCustomer}
            countries={countries}
          />
        )}

        <Row justify="center" align="middle">
          <Col xs={22} sm={20} md={18} lg={14} xl={12}>
            <Card bordered style={{ borderRadius: 15, marginBlock: 40 }}>
              <Switch
                checked={!componentDisabled}
                onChange={(checked) => {
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
                {customerData?.addresses &&
                  customerData.addresses.map((address) => {
                    const { id } = address;

                    const isDefaultShipping = customerData.defaultShippingAddressId === id;
                    const isDefaultBilling = customerData.defaultBillingAddressId === id;
                    const isShipping = customerData.shippingAddressIds
                      ? customerData.shippingAddressIds.includes(id!)
                      : false;
                    const isBilling = customerData.billingAddressIds
                      ? customerData.billingAddressIds.includes(id!)
                      : false;

                    return (
                      <AddressProfileSection
                        key={id}
                        countries={countries}
                        form={form}
                        isModal={false}
                        nameSuffix={id}
                        componentDisabled={componentDisabled}
                        isShipping={isShipping}
                        isBilling={isBilling}
                        isDefaultShipping={isDefaultShipping}
                        isDefaultBilling={isDefaultBilling}
                        version={customerData.version}
                        updateCustomerData={updateCustomer}
                      />
                    );
                  })}
                <Button onClick={() => setIsModalVisible(true)}>Add New Address</Button>
                <Form.Item style={{ textAlign: 'center' }}>
                  <Button type="primary" htmlType="submit">
                    Save Changes
                  </Button>
                </Form.Item>
              </Form>
              <div style={{ marginTop: 100 }}></div>
              <DividerText text={'Change Password'} />
              <Form
                name="user-password-form"
                initialValues={{
                  remember: true,
                }}
                layout="vertical"
                autoComplete="on"
                onFinish={changePassword}
              >
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
                  dependencies={['newPassword']}
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
