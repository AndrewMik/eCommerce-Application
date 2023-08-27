import { Form, Input } from 'antd';
import { Rule } from 'antd/es/form';

interface InputFieldProps {
  label: string;
  name: string;
  placeholder: string;
  rules: Rule[];
  required?: boolean;
  componentDisabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  placeholder,
  rules,
  required = false,
  componentDisabled,
}) => {
  let pagePlaceholder = placeholder;
  if (window.location.href.match('profile')) {
    pagePlaceholder = '';
  }
  return (
    <Form.Item label={label} name={name} rules={rules} required={required}>
      <Input
        type="text"
        placeholder={pagePlaceholder}
        style={
          componentDisabled
            ? { backgroundColor: 'transparent', color: '#6d7eac', cursor: 'default', border: 'none' }
            : {}
        }
      />
    </Form.Item>
  );
};

export default InputField;
