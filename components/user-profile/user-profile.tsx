import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Layout, Card, Switch, App, Modal } from 'antd';
import { Customer } from '@commercetools/platform-sdk';
import addNewCustomerAddress from '@/pages/api/add-new-customer-address';
import updateCustomerPersonal from '@/pages/api/update-customer-personal';
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

type PasswordChangeFormData = {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
};

const Profile: React.FC<CountryOptionsProps> = ({ countries }) => {
  const { notification } = App.useApp();
  const [form] = Form.useForm();
  const [formModal] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
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

  // eslint-disable-next-line no-console
  console.log('customerData', customerData);
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

  const [state, setState] = useState({
    isDefaultShipping: false,
    isDefaultBilling: false,
    isShipping: false,
    isBilling: false,
  });

  function updateCustomer(customer: Customer) {
    setCustomerData(customer);
    setFormData(form, customer);
  }

  async function updateCustomerData() {
    const customer = await getClient();
    updateCustomer(customer as Customer);
    return customer as Customer;
  }

  const saveCustomerChanges = async (formData: FormData) => {
    // eslint-disable-next-line no-console
    console.log('formData', formData);
    await updateCustomerPersonal(customerData as Customer, formData as FormData);
    setComponentDisabled(true);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    formModal.resetFields();
  };

  const addNewAddress = async (formData: FormDataAddNewAddress) => {
    await addNewCustomerAddress(customerData as Customer, formData);

    const updatedCustomer = await updateCustomerData();

    setState({
      isShipping: formData.setAsShipping_newAddress,
      isBilling: formData.setAsBilling_newAddress,
      isDefaultShipping: formData.setAsDefaultShipping_newAddress,
      isDefaultBilling: formData.setAsDefaultBilling_newAddress,
    });

    if (updatedCustomer.addresses && updatedCustomer.addresses.length > 0) {
      const lastCustomerAddressId = updatedCustomer.addresses[updatedCustomer.addresses.length - 1].id as string;

      const response = await setTagsToNewAddress(updatedCustomer.version, lastCustomerAddressId, state);
      if (response.statusCode === 200) {
        notification.success({
          message: `New address added!`,
        });
        const fetchData = async () => {
          const customer = await getClient();
          setCustomerData(customer as Customer);
        };

        fetchData().catch(console.error);
      } else {
        notification.error({
          message: `Failed to remove the address`,
        });
      }
    }

    handleCancel();
    setComponentDisabled(true);
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
    } else {
      notification.error({
        message: `Password change failed!`,
      });
    }
  };

  const onDefaultShippingChange = (checked: boolean) => {
    setState((prevState) => ({
      ...prevState,
      isDefaultShipping: checked,
    }));
  };

  const onDefaultBillingChange = (checked: boolean) => {
    setState((prevState) => ({
      ...prevState,
      isDefaultBilling: checked,
    }));
  };

  const onShippingChange = (checked: boolean) => {
    setState((prevState) => ({
      ...prevState,
      isShipping: checked,
    }));
  };

  const onBillingChange = (checked: boolean) => {
    setState((prevState) => ({
      ...prevState,
      isBilling: checked,
    }));
  };

  useEffect(() => {
    updateCustomerData();
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
                        onDefaultShippingChange={onDefaultShippingChange}
                        onDefaultBillingChange={onDefaultBillingChange}
                        onShippingChange={onShippingChange}
                        onBillingChange={onBillingChange}
                        version={customerData.version}
                        addressId={customerData.addresses[index].id}
                        updateCustomerData={updateCustomer}
                      />
                    );
                  })}
                <Button onClick={showModal}>Add New Address</Button>
                <Modal
                  title="Add Address"
                  open={isModalVisible}
                  onCancel={handleCancel}
                  footer={[
                    <Button key="cancel" onClick={handleCancel}>
                      Cancel
                    </Button>,
                    <Button key="submit" type="primary" form="address-form" htmlType="submit">
                      Save
                    </Button>,
                  ]}
                >
                  <Form id="address-form" form={formModal} autoComplete="on" layout="vertical" onFinish={addNewAddress}>
                    <Form.Item>
                      <AddressProfileSection
                        form={formModal}
                        countries={countries}
                        nameSuffix={`newAddress`}
                        componentDisabled={false}
                        isShipping={false}
                        isBilling={false}
                        isDefaultShipping={false}
                        isDefaultBilling={false}
                        onDefaultShippingChange={onDefaultShippingChange}
                        onDefaultBillingChange={onDefaultBillingChange}
                        onShippingChange={onShippingChange}
                        onBillingChange={onBillingChange}
                        updateCustomerData={updateCustomer}
                      />
                    </Form.Item>
                  </Form>
                </Modal>
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
