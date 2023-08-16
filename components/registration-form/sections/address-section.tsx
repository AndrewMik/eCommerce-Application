import { Form, Checkbox, Row, Col } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import InputField from '../fields/input-field';
import SelectField from '../fields/select-field';
import SwitchField from '../fields/switch-field';
import DividerText from '../fields/divider-field';

import { getStreetRules, getCountryRules, getPostalCodeRules } from '../helpers/validation-rules';
import fieldDefinitions from '../helpers/field-definitions';

interface AddressSectionProps {
  countries: string[];
  form: FormInstance;
  title: string;
  nameSuffix?: string;
  showCheckbox?: boolean;
  onUseBillingAddressChange?: (checked: boolean) => void;
}

enum ShippingFieldsName {
  STREET = 'street_shipping',
  HOUSE = 'house_shipping',
  FLAT = 'flat_shipping',
  COUNTRY = 'country_shipping',
  POSTAL_CODE = 'postalCode_shipping',
}

const AddressSection: React.FC<AddressSectionProps> = ({
  countries,
  form,
  title,
  nameSuffix = '',
  showCheckbox = false,
  onUseBillingAddressChange,
}) => {
  const streetFieldName = `street${nameSuffix}`;
  const houseFieldName = `house${nameSuffix}`;
  const flatFieldName = `flat${nameSuffix}`;
  const countryFieldName = `country${nameSuffix}`;
  const postalCodeFieldName = `postalCode${nameSuffix}`;

  const handleUseBillingAddressChange = (e: CheckboxChangeEvent) => {
    if (onUseBillingAddressChange) {
      const shippingAddressValues = form.getFieldsValue([
        ShippingFieldsName.STREET,
        ShippingFieldsName.HOUSE,
        ShippingFieldsName.FLAT,
        ShippingFieldsName.COUNTRY,
        ShippingFieldsName.POSTAL_CODE,
      ]);

      form.setFieldsValue({
        street_billing: shippingAddressValues[ShippingFieldsName.STREET],
        house_billing: shippingAddressValues[ShippingFieldsName.HOUSE],
        flat_billing: shippingAddressValues[ShippingFieldsName.FLAT],
        country_billing: shippingAddressValues[ShippingFieldsName.COUNTRY],
        postalCode_billing: shippingAddressValues[ShippingFieldsName.POSTAL_CODE],
      });

      onUseBillingAddressChange(e.target.checked);
    }
  };

  return (
    <>
      <DividerText text={title} />

      <InputField {...fieldDefinitions.street} name={streetFieldName} required={true} rules={getStreetRules()} />

      <Row gutter={16}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <InputField label="House" name={houseFieldName} placeholder="34" rules={[]}></InputField>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <InputField label="Flat" name={flatFieldName} placeholder="128" rules={[]}></InputField>
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
          <SwitchField {...fieldDefinitions.defaultAddress} defaultChecked={true}></SwitchField>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          {showCheckbox && (
            <Form.Item>
              <Checkbox onChange={handleUseBillingAddressChange}>Also use as billing address</Checkbox>
            </Form.Item>
          )}{' '}
        </Col>
      </Row>
    </>
  );
};

export default AddressSection;
