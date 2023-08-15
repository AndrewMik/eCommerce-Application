'use client';

import { useRouter } from 'next/navigation';
import { Button, Form, Input, Space, Row, Col, notification } from 'antd';
import { LockOutlined, MailOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import loginUser from '../../api/login-user';
import validatePasswordRegExp from '../../utils/input-validation';
import {
  FieldType,
  NotificationType,
  NotificationPlacement,
  NotificationMessage,
  NotificationDescription,
  Placeholders,
  ValidationMessages,
} from './types.login';

const LoginForm: React.FC = () => {
  const [hasError, setHasError] = useState<boolean | null>(null);
  const [notificationToggle, setNotificationToggle] = useState<boolean>(false);
  const [unknownError, setUnknownError] = useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description: string,
    placement: NotificationPlacement,
  ) => {
    api[type]({
      message,
      description,
      placement,
    });
  };

  useEffect(() => {
    if (unknownError) {
      openNotificationWithIcon(
        NotificationType.ERROR,
        NotificationMessage.UNKNOWN_ERROR,
        NotificationDescription.CUSTOMER_ACCOUNT_UNKNOWN_ERROR,
        NotificationPlacement.BOTTOM,
      );
      setUnknownError(false);
    } else if (hasError) {
      openNotificationWithIcon(
        NotificationType.ERROR,
        NotificationMessage.INVALID_CREDENTIALS,
        NotificationDescription.CUSTOMER_ACCOUNT_DOES_NOT_EXIST,
        NotificationPlacement.BOTTOM,
      );
    } else if (hasError === false) {
      openNotificationWithIcon(
        NotificationType.SUCCESS,
        NotificationMessage.AUTENTICATED,
        NotificationDescription.CUSTOMER_ACCOUNT_AUTHENTICATED,
        NotificationPlacement.BOTTOM,
      );
    }
  }, [notificationToggle]);

  const onFinish = async ({ email, password }: FieldType) => {
    const statusCode = await loginUser(email, password);
    if (statusCode === 200) {
      setHasError(false);
    } else if (statusCode === 400) {
      setHasError(true);
    } else {
      setUnknownError(true);
    }
    setNotificationToggle((prevState) => !prevState);
    if (statusCode === 200) {
      setTimeout(() => {
        router.replace(`/`);
      }, 1500);
    }
  };

  const iconStyle = {
    color: 'rgba(0,0,0,.25)',
    display: 'flex',
  };

  return (
    <>
      {contextHolder}
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
