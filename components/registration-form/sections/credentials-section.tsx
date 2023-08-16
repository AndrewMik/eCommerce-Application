import EmailField from '../fields/email-field';
import PasswordField from '../fields/password-field';
import DividerText from '../fields/divider-field';

import { getEmailRules, getPasswordRules } from '../helpers/validation-rules';
import fieldDefinitions from '../helpers/field-definitions';

const CredentialsSection: React.FC = () => {
  return (
    <>
      <DividerText text="Credentials" />

      <EmailField {...fieldDefinitions.email} rules={getEmailRules()} />
      <PasswordField {...fieldDefinitions.password} rules={getPasswordRules()} />
    </>
  );
};

export default CredentialsSection;
