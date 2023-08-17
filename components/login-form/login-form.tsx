'use client';

import { useRouter } from 'next/navigation';
import { Button, Form, Input, Space, Row, Col, Divider, Typography } from 'antd';
import { LockOutlined, MailOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useContext } from 'react';
import { AuthContext } from '../../context/authorization-context';
import loginUser from '../../api/login-user';
import validatePasswordRegExp from '../../utils/input-validation';
import { FieldType, Placeholders, ValidationMessages } from './types.login';

const { Link } = Typography;

const LoginForm: React.FC = () => {
  const router = useRouter();
  const { saveLogInState, setLogInStatusCode, setIsLoggedIn, setToggleNotificationForLogIn } = useContext(AuthContext);

  const onFinish = async ({ email, password }: FieldType) => {
    const { statusCode, customer } = await loginUser(email, password);
    if (statusCode) {
      setLogInStatusCode(statusCode);
      if (statusCode === 200) {
        router.replace(`/`);
        if (customer) {
          setIsLoggedIn(true);
          saveLogInState(customer.id);
        }
      }
    }
    setToggleNotificationForLogIn((prevState) => !prevState);
  };

  const iconStyle = {
    color: 'rgba(0,0,0,.25)',
    display: 'flex',
  };

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
            onFinish={onFinish}
          >
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
              <div>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: ValidationMessages.EmailRequired },
                    { type: 'email', message: ValidationMessages.EmailInvalid },
                  ]}
                >
                  <Input prefix={<MailOutlined style={iconStyle} />} placeholder={Placeholders.Email} />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: ValidationMessages.PasswordRequired },
                    {
                      pattern: validatePasswordRegExp,
                      message: ValidationMessages.PasswordPattern,
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined style={iconStyle} />}
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
                  Sign in
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
      <Divider />
      <Row justify="center">
        <Col>
          <span>Haven't registered yet? </span>
          <span>
            Sign up
            <Link href={'/registration'}> here!</Link>
          </span>
        </Col>
      </Row>
    </>
  );
};

export default LoginForm;
