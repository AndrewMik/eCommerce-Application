'use client';

import { Layout, Menu, Button, Drawer, Row, Col, notification } from 'antd';
import {
  MenuOutlined,
  HomeOutlined,
  UserOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import {
  NotificationType,
  NotificationPlacement,
  NotificationMessage,
  NotificationDescription,
} from '../../components/login-form/types.login';
import { useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { AuthContext } from '../../context/authorization-context';
import { Paths, navigationLinks } from '../../utils/route-links';
import logo from '../../public/kiddo-logo.svg';
import { log } from 'console';

const { Header } = Layout;

const MainHeader = () => {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const { isLoggedIn, removeLogInState, toggleNotification, logInStatusCode, registrationStatusCode, isRegistered } =
    useContext(AuthContext);
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleSignOutButtonClick = () => {
    removeLogInState();
    router.push(Paths.LOGIN);
  };

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
    console.log(logInStatusCode);
    if (logInStatusCode === 200) {
      openNotificationWithIcon(
        NotificationType.SUCCESS,
        NotificationMessage.AUTENTICATED,
        NotificationDescription.CUSTOMER_ACCOUNT_AUTHENTICATED,
        NotificationPlacement.BOTTOM,
      );
    } else if (logInStatusCode === 400) {
      openNotificationWithIcon(
        NotificationType.ERROR,
        NotificationMessage.INVALID_CREDENTIALS,
        NotificationDescription.CUSTOMER_ACCOUNT_DOES_NOT_EXIST,
        NotificationPlacement.BOTTOM,
      );
    } else if (!logInStatusCode) {
      return;
    } else {
      {
        openNotificationWithIcon(
          NotificationType.ERROR,
          NotificationMessage.UNKNOWN_ERROR,
          NotificationDescription.CUSTOMER_ACCOUNT_UNKNOWN_ERROR,
          NotificationPlacement.BOTTOM,
        );
      }
    }
  }, [toggleNotification]);

  const navigationLinksForAuthorizedUser = [
    {
      key: Paths.HOME,
      label: <Link href={Paths.HOME}>Home</Link>,
      icon: <HomeOutlined style={{ color: '#633211' }} />,
    },
    {
      key: Paths.PROFILE,
      label: <Link href={Paths.PROFILE}>Profile</Link>,
      icon: <UserOutlined style={{ color: '#f5a60a' }} />,
    },
    {
      key: Paths.CATALOG,
      label: <Link href={Paths.CATALOG}>Catalog</Link>,
      icon: <ShoppingOutlined style={{ color: '#f50abe' }} />,
    },
    {
      key: Paths.CART,
      label: <Link href={Paths.CART}>Cart</Link>,
      icon: <ShoppingCartOutlined style={{ color: '#F94C10' }} />,
    },
    {
      key: 'sign-out',
      label: (
        <Button onClick={handleSignOutButtonClick} type="link" style={{ paddingLeft: 0 }}>
          Sign out
        </Button>
      ),
      icon: <LogoutOutlined style={{ color: '#1677ff' }} />,
    },
  ];

  return (
    <>
      {contextHolder}
      <Header style={{ padding: 0 }}>
        <Row>
          <Col xs={20} sm={20} md={4} style={{ lineHeight: 0 }}>
            <Link href={'/'} style={{ marginLeft: 10 }}>
              <Image src={logo} height={64} alt="Kiddo Kingdom" priority={true} />
            </Link>
          </Col>
          <Col
            xs={0}
            sm={0}
            md={{ span: 16, offset: 4 }}
            lg={{ span: 13, offset: 7 }}
            xl={{ span: 10, offset: 10 }}
            xxl={{ span: 8, offset: 12 }}
          >
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[`${pathname}`]}
              items={isLoggedIn ? navigationLinksForAuthorizedUser : navigationLinks}
            />
          </Col>
          <Col xs={4} sm={4} md={0}>
            <Button type="primary" onClick={showDrawer}>
              <MenuOutlined />
            </Button>
          </Col>
        </Row>
        <Drawer title="Menu" placement="right" onClick={onClose} onClose={onClose} open={visible}>
          <Menu mode="vertical" selectedKeys={[`${pathname}`]} items={navigationLinks} />
        </Drawer>
      </Header>
    </>
  );
};

export default MainHeader;
