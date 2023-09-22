import { Form, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { Rule } from 'antd/es/form';

interface PasswordFieldProps {
  label?: string;
  name: string;
  placeholder?: string;
  rules: Rule[];
  iconStyle?: React.CSSProperties;
  hasFeedback?: boolean;
  dependencies?: string[] | undefined;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  label = 'Password',
  name,
  placeholder = 'securePassword1!',
  rules,
  iconStyle,
  hasFeedback = false,
  dependencies,
}) => (
  <Form.Item
    label={label}
    name={name}
    required={true}
    rules={rules}
    hasFeedback={hasFeedback}
    dependencies={dependencies}
  >
    <Input.Password prefix={<LockOutlined style={iconStyle} />} placeholder={placeholder} />
  </Form.Item>
);

export default PasswordField;
