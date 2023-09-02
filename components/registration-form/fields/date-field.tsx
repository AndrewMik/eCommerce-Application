import { Form, DatePicker } from 'antd';
import { Rule } from 'antd/es/form';
import { FormInstance } from 'antd/lib/form';
import dayjs from 'dayjs';
import moment from 'moment';

interface DateFieldProps {
  label: string;
  name: string;
  placeholder: string;
  rules: Rule[];
  form: FormInstance;
}

const DateField: React.FC<DateFieldProps> = ({ label, name, placeholder, rules, form }) => (
  <Form.Item label={label} name={name} required={true} rules={rules}>
    <DatePicker
      style={{ width: '100%' }}
      format="YYYY-MM-DD"
      placeholder={placeholder}
      disabledDate={(current) => current && current > moment().endOf('day')}
      onChange={() => {
        if (form) {
          form.setFieldsValue({
            dateOfBirthProfile: dayjs(form.getFieldValue('dateOfBirth')).format('YYYY-MM-DD'),
          });
        }
      }}
    />
  </Form.Item>
);

export type { DateFieldProps };
export default DateField;
