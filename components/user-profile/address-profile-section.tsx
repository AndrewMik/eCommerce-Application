import { Row, Col, Tag, Space, Divider, Button, App } from 'antd';
import { FormInstance } from 'antd/lib/form';

import { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Customer } from '@commercetools/platform-sdk';
import removeAddress from '@/pages/api/remove-address';
import InputField from '../registration-form/fields/input-field';
import SelectField from '../registration-form/fields/select-field';
import SwitchField from '../registration-form/fields/switch-field';

import {
  getStreetRules,
  getCountryRules,
  getPostalCodeRules,
  getCityRules,
} from '../registration-form/helpers/validation-rules';
import fieldDefinitions from '../registration-form/helpers/field-definitions';
import { AddressFieldsName } from '../registration-form/helpers/registration.types';
import { SectionProps } from '../registration-form/helpers/interface';

interface AddressProfileSectionProps {
  countries: string[];
  form: FormInstance;
  nameSuffix?: string;
  isShipping: boolean;
  isBilling: boolean;
  isDefaultShipping: boolean;
  isDefaultBilling: boolean;
  onDefaultShippingChange: (checked: boolean) => void;
  onDefaultBillingChange: (checked: boolean) => void;
  onShippingChange: (checked: boolean) => void;
  onBillingChange: (checked: boolean) => void;
  version?: number;
  addressId?: string;
  updateCustomerData: (customer: Customer) => void;
}

const AddressProfileSection: React.FC<AddressProfileSectionProps & SectionProps> = ({
  countries,
  form,
  nameSuffix = '',
  componentDisabled,
  isShipping = false,
  isBilling = false,
  isDefaultBilling = false,
  isDefaultShipping = false,
  onDefaultShippingChange,
  onDefaultBillingChange,
  onShippingChange,
  onBillingChange,
  version,
  addressId,
  updateCustomerData,
}) => {
  const { notification } = App.useApp();

  const streetFieldName = `${AddressFieldsName.STREET}_${nameSuffix}`;
  const cityFieldName = `${AddressFieldsName.CITY}_${nameSuffix}`;
  const buildingFieldName = `${AddressFieldsName.BUILDING}_${nameSuffix}`;
  const flatFieldName = `${AddressFieldsName.APARTMENT}_${nameSuffix}`;
  const countryFieldName = `${AddressFieldsName.COUNTRY}_${nameSuffix}`;
  const postalCodeFieldName = `${AddressFieldsName.POSTAL_CODE}_${nameSuffix}`;
  const setAsShipping = `${AddressFieldsName.SET_AS_SHIPPING}_${nameSuffix}`;
  const setAsBilling = `${AddressFieldsName.SET_AS_BILLING}_${nameSuffix}`;
  const setAsDefaultShipping = `${AddressFieldsName.SET_AS_DEFAULT_SHIPPING}_${nameSuffix}`;
  const setAsDefaultBilling = `${AddressFieldsName.SET_AS_DEFAULT_BILLING}_${nameSuffix}`;

  const isProfilePage = window.location.href.match('profile');
  const isRegistrationPage = window.location.href.match('registration');

  const [localIsShipping, setLocalIsShipping] = useState(isShipping);
  const [localIsBilling, setLocalIsBilling] = useState(isBilling);
  const [localIsDefaultShipping, setLocalIsDefaultShipping] = useState(isDefaultShipping);
  const [localIsDefaultBilling, setLocalIsDefaultBilling] = useState(isDefaultBilling);
  const [removedAddress, setRemovedAddress] = useState(false);

  const handleDefaultShippingChange = (checked: boolean) => {
    setLocalIsDefaultShipping(checked);
    onDefaultShippingChange(checked);
  };

  const handleDefaultBillingChange = (checked: boolean) => {
    setLocalIsDefaultBilling(checked);
    onDefaultBillingChange(checked);
  };

  const handleShippingChange = (checked: boolean) => {
    setLocalIsShipping(checked);
    onShippingChange(checked);
  };

  const handleBillingChange = (checked: boolean) => {
    setLocalIsBilling(checked);
    onBillingChange(checked);
  };

  const handleRemoveAddress = async (customerVersion: number, customerAddressId: string) => {
    // eslint-disable-next-line no-console
    console.log('from handleRemoveAddress', customerVersion, customerAddressId);
    const response = await removeAddress(customerVersion, customerAddressId);
    if (response.statusCode === 200) {
      updateCustomerData(response as unknown as Customer);
      setRemovedAddress(true);
      notification.success({
        message: `Address successfully deleted!`,
      });
    } else {
      notification.error({
        message: 'Error',
        description: 'Failed to remove the address',
      });
    }
  };

  if (removedAddress) {
    return null;
    // Don't render this component if the address has been removed
  }

  return (
    <>
      <Space size={[2, 4]} wrap style={{ marginBottom: 40 }}>
        {localIsShipping && <Tag color="blue">Shipping</Tag>}
        {localIsBilling && <Tag color="green">Billing</Tag>}
        {localIsDefaultShipping && <Tag color="cyan">Default Shipping</Tag>}
        {localIsDefaultBilling && <Tag color="purple">Default Billing</Tag>}
      </Space>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          {(isRegistrationPage || (isProfilePage && !componentDisabled)) && (
            <>
              <SelectField
                {...fieldDefinitions.country}
                name={countryFieldName}
                options={countries.map((country) => ({ value: country, label: country }))}
                rules={getCountryRules()}
                required={true}
                onChange={() => form.validateFields([postalCodeFieldName])}
              />
            </>
          )}
          {isProfilePage && componentDisabled && (
            <InputField
              {...fieldDefinitions.country}
              name={countryFieldName}
              componentDisabled={componentDisabled}
              required={true}
              rules={[]}
            />
          )}
        </Col>

        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <InputField
            {...fieldDefinitions.postalCode}
            componentDisabled={componentDisabled}
            name={postalCodeFieldName}
            rules={getPostalCodeRules(form, countryFieldName)}
            required={true}
          ></InputField>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <InputField
            {...fieldDefinitions.city}
            componentDisabled={componentDisabled}
            name={cityFieldName}
            required={true}
            rules={getCityRules()}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <InputField
            {...fieldDefinitions.street}
            componentDisabled={componentDisabled}
            name={streetFieldName}
            required={true}
            rules={getStreetRules()}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <InputField
            {...fieldDefinitions.building}
            componentDisabled={componentDisabled}
            name={buildingFieldName}
            rules={[]}
          ></InputField>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <InputField
            {...fieldDefinitions.apartment}
            componentDisabled={componentDisabled}
            name={flatFieldName}
            rules={[]}
          ></InputField>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <SwitchField
            defaultChecked={isDefaultShipping}
            onChange={handleDefaultShippingChange}
            name={setAsDefaultShipping}
            {...fieldDefinitions.defaultShippingAddress}
          ></SwitchField>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <SwitchField
            defaultChecked={isDefaultBilling}
            onChange={handleDefaultBillingChange}
            name={setAsDefaultBilling}
            {...fieldDefinitions.defaultBillingAddress}
          ></SwitchField>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <SwitchField
            defaultChecked={isShipping}
            onChange={handleShippingChange}
            name={setAsShipping}
            {...fieldDefinitions.addressShipping}
          ></SwitchField>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <SwitchField
            defaultChecked={isBilling}
            onChange={handleBillingChange}
            name={setAsBilling}
            {...fieldDefinitions.addressBilling}
          ></SwitchField>
        </Col>
      </Row>
      <Button
        type="primary"
        danger
        icon={<CloseOutlined />}
        onClick={() => handleRemoveAddress(version as number, addressId as string)}
      >
        Remove
      </Button>
      <Divider></Divider>
    </>
  );
};

export default AddressProfileSection;
