'use client';

import { Form, Input, Button, DatePicker, Switch } from 'antd';
import moment from 'moment';

const RegistrationForm: React.FC = () => {
  // const onFinish = (values: any) => {
  //   console.log('Received values of form: ', values);
  // };

  return (
    <div>
      <Form name="register-form" initialValues={{ remember: true }} autoComplete="on">
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name',
            },
          ]}
        >
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item
          name="surname"
          rules={[
            {
              required: true,
              message: 'Please input your surname',
            },
          ]}
        >
          <Input placeholder="Surname" />
        </Form.Item>

        <Form.Item
          name="date-of-birth"
          rules={[
            {
              type: 'object',
              required: true,
              message: 'Please select your date of birth',
            },
          ]}
        >
          <DatePicker
            format="YYYY-MM-DD"
            placeholder="Date of Birth"
            disabledDate={(current) => current && current > moment().endOf('day')}
          />
        </Form.Item>

        <Form.Item
          name="street"
          rules={[
            {
              required: true,
              message: 'Please input your street',
            },
          ]}
        >
          <Input placeholder="Street" />
        </Form.Item>

        <Form.Item name="house">
          <Input placeholder="House (optional)" />
        </Form.Item>

        <Form.Item name="flat">
          <Input placeholder="Flat (optional)" />
        </Form.Item>

        <Form.Item
          name="postal-code"
          rules={[
            {
              required: true,
              message: 'Please input your postal code',
            },
          ]}
        >
          <Input placeholder="Postal Code" />
        </Form.Item>

        <Form.Item
          name="country"
          rules={[
            {
              required: true,
              message: 'Please input your country',
            },
          ]}
        >
          <Input placeholder="Country" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid e-mail',
            },
            {
              required: true,
              message: 'Please input your e-mail',
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password',
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item name="set-default-address" valuePropName="checked">
          <Switch /> Set as default address
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            Already registered? <Button type="link">Login</Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegistrationForm;
