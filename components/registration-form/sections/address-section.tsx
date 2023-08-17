import { Form, Checkbox, Row, Col } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import InputField from '../fields/input-field';
import SelectField from '../fields/select-field';
import SwitchField from '../fields/switch-field';
import DividerText from '../fields/divider-field';

import { getStreetRules, getCountryRules, getPostalCodeRules } from '../helpers/validation-rules';
import fieldDefinitions from '../helpers/field-definitions';
import { AddressFieldsName, ShippingFieldsName } from '../helpers/registration.types';

interface AddressSectionProps {
  countries: string[];
  form: FormInstance;
  title: string;
  nameSuffix?: string;
  showCheckbox?: boolean;
  onUseBillingAddressChange?: (checked: boolean) => void;
}

const AddressSection: React.FC<AddressSectionProps> = ({
  countries,
  form,
  title,
  nameSuffix = '',
  showCheckbox = false,
  onUseBillingAddressChange,
}) => {
  const streetFieldName = `${AddressFieldsName.STREET_NAME}${nameSuffix}`;
  const houseFieldName = `${AddressFieldsName.STREET_NUMBER}${nameSuffix}`;
  const flatFieldName = `${AddressFieldsName.APARTMENT}${nameSuffix}`;
  const countryFieldName = `${AddressFieldsName.COUNTRY}${nameSuffix}`;
  const postalCodeFieldName = `${AddressFieldsName.POSTAL_CODE}${nameSuffix}`;
  const setAsDefault = `${AddressFieldsName.SET_AS_DEFAULT}${nameSuffix}`;
  const useAsBillingAddress = AddressFieldsName.USE_AS_BILLING_ADDRESS;

  const handleUseBillingAddressChange = (e: CheckboxChangeEvent) => {
    if (onUseBillingAddressChange) {
      const shippingAddressValues = form.getFieldsValue([
        ShippingFieldsName.STREET_NAME,
        ShippingFieldsName.STREET_NUMBER,
        ShippingFieldsName.APARTMENT,
        ShippingFieldsName.COUNTRY,
        ShippingFieldsName.POSTAL_CODE,
      ]);

      form.setFieldsValue({
        street_billing: shippingAddressValues[ShippingFieldsName.STREET_NAME],
        house_billing: shippingAddressValues[ShippingFieldsName.STREET_NUMBER],
        flat_billing: shippingAddressValues[ShippingFieldsName.APARTMENT],
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

      <InputField {...fieldDefinitions.street} name={streetFieldName} required={true} rules={getStreetRules()} />

      <Row gutter={16}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <InputField {...fieldDefinitions.streetNumber} name={houseFieldName} rules={[]}></InputField>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <InputField {...fieldDefinitions.apartment} name={flatFieldName} rules={[]}></InputField>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <SelectField
            {...fieldDefinitions.country}
            name={countryFieldName}
            options={countries.map((country) => ({ value: country, label: country }))}
            rules={getCountryRules()}
            required={true}
            onChange={() => form.validateFields([postalCodeFieldName])}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <InputField
            {...fieldDefinitions.postalCode}
            name={postalCodeFieldName}
            rules={getPostalCodeRules(form, countryFieldName)}
            required={true}
          ></InputField>
        </Col>
      </Row>

      <Row>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item valuePropName="checked">
            <SwitchField name={setAsDefault} {...fieldDefinitions.defaultAddress}></SwitchField>
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          {showCheckbox && (
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
