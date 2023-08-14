import { Form, Switch, Row, Col } from 'antd';

interface SwitchFieldProps {
  name: string;
  label?: string;
  defaultChecked?: boolean;
}

const SwitchField: React.FC<SwitchFieldProps> = ({ name, label, defaultChecked }) => (
  <Form.Item name={name} valuePropName="checked">
    <Row align="middle">
      <Col>
        <Switch defaultChecked={defaultChecked} />
      </Col>
      <Col>{label && <span style={{ marginLeft: '8px' }}>{label}</span>}</Col>
    </Row>
  </Form.Item>
);

export default SwitchField;
