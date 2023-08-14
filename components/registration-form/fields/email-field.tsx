import { Form, Input } from 'antd';
import { MailOutlined } from '@ant-design/icons';

interface EmailFieldProps {
  label?: string;
  name: string;
  placeholder?: string;
  rules?: any[];
  iconStyle?: React.CSSProperties;
}

const EmailField: React.FC<EmailFieldProps> = ({
  label = 'Email',
  name,
  placeholder = 'your.email@gmail.com',
  rules,
  iconStyle,
}) => (
  <Form.Item label={label} name={name} rules={rules}>
    <Input prefix={<MailOutlined style={iconStyle} />} placeholder={placeholder} />
  </Form.Item>
);

export default EmailField;
