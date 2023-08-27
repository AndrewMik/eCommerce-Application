import { Form, Checkbox, Row, Col } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import InputField from '../fields/input-field';
import SelectField from '../fields/select-field';
import SwitchField from '../fields/switch-field';
import DividerText from '../fields/divider-field';

import { getStreetRules, getCountryRules, getPostalCodeRules, getCityRules } from '../helpers/validation-rules';
import fieldDefinitions from '../helpers/field-definitions';
import { AddressFieldsName, ShippingFieldsName } from '../helpers/registration.types';
import SectionProps from './section-interface';

interface AddressSectionProps {
  countries: string[];
  form: FormInstance;
  title: string;
  nameSuffix?: string;
  showCheckbox?: boolean;
  onUseBillingAddressChange?: (checked: boolean) => void;
}

const AddressSection: React.FC<AddressSectionProps & SectionProps> = ({
  countries,
  form,
  title,
  nameSuffix = '',
  showCheckbox = false,
  onUseBillingAddressChange,
  componentDisabled,
}) => {
  const streetFieldName = `${AddressFieldsName.STREET}${nameSuffix}`;
  const cityFieldName = `${AddressFieldsName.CITY}${nameSuffix}`;
  const buildingFieldName = `${AddressFieldsName.BUILDING}${nameSuffix}`;
  const flatFieldName = `${AddressFieldsName.APARTMENT}${nameSuffix}`;
  const countryFieldName = `${AddressFieldsName.COUNTRY}${nameSuffix}`;
  const postalCodeFieldName = `${AddressFieldsName.POSTAL_CODE}${nameSuffix}`;
  const setAsDefault = `${AddressFieldsName.SET_AS_DEFAULT}${nameSuffix}`;
  const useAsBillingAddress = AddressFieldsName.USE_AS_BILLING_ADDRESS;

  const isProfilePage = window.location.href.match('profile');
  const isRegistrationPage = window.location.href.match('registration');

  const handleUseBillingAddressChange = (e: CheckboxChangeEvent) => {
    if (onUseBillingAddressChange) {
      const shippingAddressValues = form.getFieldsValue([
        ShippingFieldsName.STREET,
        ShippingFieldsName.BUILDING,
        ShippingFieldsName.APARTMENT,
        ShippingFieldsName.COUNTRY,
        ShippingFieldsName.CITY,
        ShippingFieldsName.POSTAL_CODE,
      ]);

      form.setFieldsValue({
        city_billing: shippingAddressValues[ShippingFieldsName.CITY],
        street_billing: shippingAddressValues[ShippingFieldsName.STREET],
        building_billing: shippingAddressValues[ShippingFieldsName.BUILDING],
        apartment_billing: shippingAddressValues[ShippingFieldsName.APARTMENT],
        country_billing: shippingAddressValues[ShippingFieldsName.COUNTRY],
        postalCode_billing: shippingAddressValues[ShippingFieldsName.POSTAL_CODE],
      });

      onUseBillingAddressChange(e.target.checked);
      e.target.value = e.target.checked;
    }
  };

  return (
    <>
      <DividerText text={title} />
      <Row gutter={16}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          {(isRegistrationPage || (isProfilePage && componentDisabled)) && (
            <SelectField
              {...fieldDefinitions.country}
              name={countryFieldName}
              options={countries.map((country) => ({ value: country, label: country }))}
              rules={getCountryRules()}
              required={true}
              onChange={() => form.validateFields([postalCodeFieldName])}
            />
          )}
          {isProfilePage && !componentDisabled && (
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
          <SwitchField name={setAsDefault} {...fieldDefinitions.defaultAddress}></SwitchField>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          {isRegistrationPage && showCheckbox && (
            <Form.Item name={useAsBillingAddress} valuePropName="checked">
              <Checkbox onChange={handleUseBillingAddressChange}>Also use as billing address</Checkbox>
            </Form.Item>
          )}{' '}
        </Col>
      </Row>
    </>
  );
};

export default AddressSection;
