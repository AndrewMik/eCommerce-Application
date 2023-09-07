import { Form, Switch } from 'antd';

interface SwitchFieldProps {
  name: string;
  label?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

const SwitchField: React.FC<SwitchFieldProps> = ({ name, label, defaultChecked, disabled, onChange }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center' }}>
    <Form.Item name={name} valuePropName="checked" style={{ marginBlock: 'auto' }}>
      <Switch checked={defaultChecked} disabled={disabled} onChange={onChange} />
    </Form.Item>
    <span style={{ marginLeft: '8px' }}>{label}</span>
  </div>
);

export default SwitchField;
