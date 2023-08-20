import { Row, Col } from 'antd';

import InputField from '../fields/input-field';
import DateField from '../fields/date-field';
import SelectField from '../fields/select-field';
import DividerText from '../fields/divider-field';

import { getNameRules, getSurnameRules, getBirthDateRules } from '../helpers/validation-rules';
import fieldDefinitions from '../helpers/field-definitions';

const PersonalSection: React.FC = () => {
  return (
    <>
      <DividerText text="Personal" />

      <InputField {...fieldDefinitions.name} required={true} rules={getNameRules()} />
      <InputField {...fieldDefinitions.surname} required={true} rules={getSurnameRules()} />

      <Row gutter={16}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <DateField {...fieldDefinitions.birthDate} rules={getBirthDateRules()} />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <SelectField
            {...fieldDefinitions.gender}
            options={[
              { value: 'female', label: 'Female' },
              { value: 'male', label: 'Male' },
              { value: 'other', label: 'Other' },
            ]}
            rules={[]}
          />
        </Col>
      </Row>
    </>
  );
};

export default PersonalSection;
