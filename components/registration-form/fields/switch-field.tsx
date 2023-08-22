import { Form, Switch } from 'antd';

interface SwitchFieldProps {
  name: string;
  label?: string;
  defaultChecked?: boolean;
}

const SwitchField: React.FC<SwitchFieldProps> = ({ name, label }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center' }}>
    <Form.Item name={name} valuePropName="checked" style={{ marginBlock: 'auto' }}>
      <Switch defaultChecked />
    </Form.Item>
    <span style={{ marginLeft: '8px' }}>{label}</span>
  </div>
);

export default SwitchField;
