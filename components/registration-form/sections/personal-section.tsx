import { Row, Col } from 'antd';

import { FormInstance } from 'antd/lib/form';

import InputField from '../fields/input-field';
import DateField from '../fields/date-field';
import SelectField from '../fields/select-field';
import DividerText from '../fields/divider-field';

import { getNameRules, getSurnameRules, getBirthDateRules } from '../helpers/validation-rules';
import fieldDefinitions from '../helpers/field-definitions';
import { SectionProps } from '../helpers/interface';

const PersonalSection: React.FC<SectionProps> = ({ componentDisabled, form }) => {
  const isProfilePage = window.location.href.match('profile');
  const isRegistrationPage = window.location.href.match('registration');

  return (
    <>
      <DividerText text="Personal" />

      <InputField
        {...fieldDefinitions.name}
        componentDisabled={componentDisabled}
        required={true}
        rules={getNameRules()}
      />
      <InputField
        {...fieldDefinitions.surname}
        componentDisabled={componentDisabled}
        required={true}
        rules={getSurnameRules()}
      />

      <Row gutter={16}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          {(isRegistrationPage || (isProfilePage && !componentDisabled)) && (
            <DateField {...fieldDefinitions.birthDate} form={form as FormInstance} rules={getBirthDateRules()} />
          )}
          {isProfilePage && componentDisabled && (
            <InputField
              {...fieldDefinitions.birthDateOnUserProfile}
              componentDisabled={componentDisabled}
              required={true}
              rules={[]}
            />
          )}
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          {(isRegistrationPage || (isProfilePage && !componentDisabled)) && (
            <SelectField
              {...fieldDefinitions.gender}
              options={[
                { value: 'Female', label: 'Female' },
                { value: 'Male', label: 'Male' },
                { value: 'Other', label: 'Other' },
              ]}
              rules={[]}
            />
          )}
          {isProfilePage && componentDisabled && (
            <InputField {...fieldDefinitions.gender} componentDisabled={componentDisabled} rules={[]} />
          )}
        </Col>
      </Row>
    </>
  );
};

export default PersonalSection;
