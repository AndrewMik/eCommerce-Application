import { Form, Select } from 'antd';
import { Rule } from 'antd/es/form';

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  name: string;
  placeholder: string;
  rules: Rule[];
  options: Option[];
  required?: boolean;
  onChange?: (value: any) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  placeholder,
  rules,
  options,
  required = false,
  onChange,
}) => (
  <Form.Item label={label} name={name} rules={rules} required={required}>
    <Select placeholder={placeholder} onChange={onChange}>
      {options.map((option) => (
        <Select.Option key={option.value} value={option.value}>
          {option.label}
        </Select.Option>
      ))}
    </Select>
  </Form.Item>
);
export default SelectField;
