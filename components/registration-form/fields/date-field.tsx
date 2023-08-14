import { Form, DatePicker } from 'antd';
import moment from 'moment';

interface DateFieldProps {
  label: string;
  name: string;
  placeholder: string;
  rules: any[];
}

const DateField: React.FC<DateFieldProps> = ({ label, name, placeholder, rules }) => (
  <Form.Item label={label} name={name} required={true} rules={rules}>
    <DatePicker
      style={{ width: '100%' }}
      format="YYYY-MM-DD"
      placeholder={placeholder}
      disabledDate={(current) => current && current > moment().endOf('day')}
    />
  </Form.Item>
);

export default DateField;
