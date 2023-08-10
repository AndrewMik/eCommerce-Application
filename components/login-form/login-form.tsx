'use client';

import { Button, Form, Input, Space, Row, Col } from 'antd';
import { LockOutlined, MailOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

type FieldType = {
  password?: string;
  email?: string;
};

enum Placeholders {
  Email = 'your.email@gmail.com',
  Password = 'Password',
}

enum ValidationMessages {
  EmailRequired = 'Please enter your email',
  EmailInvalid = 'The email is not valid',
  PasswordRequired = 'Please enter your password',
  PasswordPattern = `Your password must contain at least one uppercase and lowercase letter, 
                    digit, and special character (such as !, @, #, $, etc.) 
                    and must not start or end with a whitespace character.`,
}

const LoginForm: React.FC = () => {
  const regExp = /(^(?![\s]))(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\W)(.{7,})(.*!?(\S+)$)/;

  return (
    <>
      <Row
        style={{
          height: '40vh',
        }}
      />
      <Row>
        <Col
          xs={{ span: 3, offset: 1 }}
          sm={{ span: 4, offset: 1 }}
          md={{ span: 5, offset: 1 }}
          lg={{ span: 6, offset: 1 }}
        />
        <Col
          xs={{ span: 16, offset: 0 }}
          sm={{ span: 14, offset: 0 }}
          md={{ span: 12, offset: 0 }}
          lg={{ span: 10, offset: 0 }}
        >
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            name="login-form"
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
              <div>
                <Form.Item<FieldType>
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: ValidationMessages.EmailRequired },
                    { type: 'email', message: ValidationMessages.EmailInvalid },
                  ]}
                >
                  <Input
                    prefix={
                      <MailOutlined
                        style={{
                          color: 'rgba(0,0,0,.25)',
                          display: 'flex',
                        }}
                      />
                    }
                    placeholder={Placeholders.Email}
                  />
                </Form.Item>

                <Form.Item<FieldType>
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: ValidationMessages.PasswordRequired },
                    {
                      pattern: regExp,
                      message: ValidationMessages.PasswordPattern,
                    },
                  ]}
                >
                  <Input.Password
                    prefix={
                      <LockOutlined
                        style={{
                          color: 'rgba(0,0,0,.25)',
                          display: 'flex',
                        }}
                      />
                    }
                    placeholder={Placeholders.Password}
                    iconRender={(visible): ReturnType<typeof EyeTwoTone> =>
                      visible ? (
                        <EyeTwoTone />
                      ) : (
                        <EyeInvisibleOutlined
                          style={{
                            display: 'flex',
                          }}
                        />
                      )
                    }
                  />
                </Form.Item>
              </div>

              <Form.Item
                wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 14, offset: 10 }, md: { span: 13, offset: 11 } }}
              >
                <Button type="primary" htmlType="submit">
                  Log in
                </Button>
              </Form.Item>
            </Space>
          </Form>
        </Col>
        <Col
          xs={{ span: 3, offset: 1 }}
          sm={{ span: 4, offset: 1 }}
          md={{ span: 5, offset: 1 }}
          lg={{ span: 6, offset: 1 }}
        />
      </Row>
    </>
  );
};

export default LoginForm;
