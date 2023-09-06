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
  isModal: boolean;
  nameSuffix?: string;
  isShipping: boolean;
  isBilling: boolean;
  isDefaultShipping: boolean;
  isDefaultBilling: boolean;
  version?: number;
  updateCustomerData: (customer: Customer) => void;
}

const AddressProfileSection: React.FC<AddressProfileSectionProps & SectionProps> = ({
  countries,
  form,
  isModal,
  nameSuffix,
  componentDisabled,
  isShipping = false,
  isBilling = false,
  isDefaultBilling = false,
  isDefaultShipping = false,
  version,
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

  const [localIsShipping, setLocalIsShipping] = useState(isShipping);
  const [localIsBilling, setLocalIsBilling] = useState(isBilling);
  const [localIsDefaultShipping, setLocalIsDefaultShipping] = useState(isDefaultShipping);
  const [localIsDefaultBilling, setLocalIsDefaultBilling] = useState(isDefaultBilling);

  const handleDefaultShippingChange = (checked: boolean) => {
    setLocalIsDefaultShipping(checked);
  };

  const handleDefaultBillingChange = (checked: boolean) => {
    setLocalIsDefaultBilling(checked);
  };

  const handleShippingChange = (checked: boolean) => {
    setLocalIsShipping(checked);
  };

  const handleBillingChange = (checked: boolean) => {
    setLocalIsBilling(checked);
  };

  const handleRemoveAddress = async (customerVersion: number, customerAddressId: string) => {
    try {
      const response = await removeAddress(customerVersion, customerAddressId);
      updateCustomerData(response.body);
      notification.success({
        message: `Address successfully deleted!`,
      });
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to remove the address',
      });
    }
  };

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
          {!componentDisabled && (
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
          {componentDisabled && (
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
      {!isModal && (
        <Button
          type="primary"
          danger
          icon={<CloseOutlined />}
          onClick={() => handleRemoveAddress(version as number, nameSuffix!)}
        >
          Remove
        </Button>
      )}
      <Divider></Divider>
    </>
  );
};

export default AddressProfileSection;
