import { Form, Switch, Row, Col } from 'antd';

interface SwitchFieldProps {
  name: string;
  label?: string;
  defaultChecked?: boolean;
}

const SwitchField: React.FC<SwitchFieldProps> = ({ name, label }) => (
  <Row align="middle">
    <Col>
      <Form.Item name={name} valuePropName="checked">
        <Switch defaultChecked />
      </Form.Item>
    </Col>
    <Col>{label && <span style={{ marginLeft: '8px' }}>{label}</span>}</Col>
  </Row>
);

export default SwitchField;
