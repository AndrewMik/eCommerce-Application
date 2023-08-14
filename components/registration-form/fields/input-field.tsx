import { Form, Input } from 'antd';
import { Rule } from 'antd/es/form';

interface InputFieldProps {
  label: string;
  name: string;
  placeholder: string;
  rules: Rule[];
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, placeholder, rules, required = false }) => (
  <Form.Item label={label} name={name} rules={rules} required={required}>
    <Input type="text" placeholder={placeholder} />
  </Form.Item>
);

export default InputField;
