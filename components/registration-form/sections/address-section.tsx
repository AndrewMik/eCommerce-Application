import { Row, Col } from 'antd';
import { FormInstance } from 'antd/lib/form';

import InputField from '../fields/input-field';
import SelectField from '../fields/select-field';
import SwitchField from '../fields/switch-field';
import DividerText from '../fields/divider-field';

import { getStreetRules, getCountryRules, getPostalCodeRules } from '../helpers/validation-rules';
import fieldDefinitions from '../helpers/field-definitions';

interface AddressSectionProps {
  countries: string[];
  form: FormInstance;
}

const AddressSection: React.FC<AddressSectionProps> = ({ countries, form }) => {
  return (
    <>
      <DividerText text="Address" />

      <InputField {...fieldDefinitions.street} required={true} rules={getStreetRules()} />

      <Row gutter={16}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <InputField label="House" name="house" placeholder="34" rules={[]}></InputField>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <InputField label="Flat" name="flat" placeholder="128" rules={[]}></InputField>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <SelectField
            {...fieldDefinitions.country}
            options={countries.map((country) => ({ value: country, label: country }))}
            rules={getCountryRules()}
            required={true}
            onChange={() => form.validateFields(['postal-code'])}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <InputField {...fieldDefinitions.postalCode} rules={getPostalCodeRules(form)} required={true}></InputField>
        </Col>
      </Row>

      <SwitchField {...fieldDefinitions.defaultAddress} defaultChecked={true}></SwitchField>
    </>
  );
};

export default AddressSection;
