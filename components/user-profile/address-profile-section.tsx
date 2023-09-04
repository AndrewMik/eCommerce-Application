import { Row, Col, Tag, Space, Divider } from 'antd';
import { FormInstance } from 'antd/lib/form';

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
}) => {
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

  return (
    <>
      <Space size={[2, 4]} wrap style={{ marginBottom: 40 }}>
        {isShipping && <Tag color="blue">Shipping</Tag>}
        {isBilling && <Tag color="green">Billing</Tag>}
        {isDefaultShipping && <Tag color="cyan">Default Shipping</Tag>}
        {isDefaultBilling && <Tag color="purple">Default Billing</Tag>}
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

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
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
          <SwitchField name={setAsDefaultShipping} {...fieldDefinitions.defaultShippingAddress}></SwitchField>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <SwitchField name={setAsDefaultBilling} {...fieldDefinitions.defaultBillingAddress}></SwitchField>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <SwitchField name={setAsShipping} {...fieldDefinitions.addressShipping}></SwitchField>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <SwitchField name={setAsBilling} {...fieldDefinitions.addressBilling}></SwitchField>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}></Col>
      </Row>
      <Divider></Divider>
    </>
  );
};

export default AddressProfileSection;
