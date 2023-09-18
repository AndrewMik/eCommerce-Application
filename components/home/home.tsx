import { LoginOutlined, UserOutlined, ShoppingOutlined, ShoppingCartOutlined, TeamOutlined } from '@ant-design/icons';
import { Col, List, Row } from 'antd';
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { DiscountCode, DiscountCodePagedQueryResponse, ErrorResponse } from '@commercetools/platform-sdk';
import Paths from '@/utils/route-links';
import { AuthContext } from '@/context/authorization-context';
import getDiscountCodes from '@/pages/api/discount/get-discount-codes';
import { handleErrorResponse } from '@/utils/handle-cart-error-response';
import Promo from '../promo/promo';

type Response = DiscountCodePagedQueryResponse | ErrorResponse | undefined;

const Home = (): JSX.Element => {
  const [promoCodes, setPromoCodes] = useState<DiscountCode[] | null>(null);
  const { isLoggedIn, setToggleInactiveLinks } = useContext(AuthContext);

  const handleLinkClick = () => {
    if (isLoggedIn) {
      setToggleInactiveLinks((prevState) => !prevState);
    }
  };

  const handleResponse = (response: Response) => {
    if (response) {
      if ('statusCode' in response) {
        handleErrorResponse(response);
      } else {
        setPromoCodes(response.results);
      }
    }
  };

  const setDiscountCodes = async () => {
    const response = await getDiscountCodes();
    handleResponse(response);
  };

  useEffect(() => {
    setDiscountCodes();
  }, []);

  const navigationMainPage = [
    {
      key: Paths.ABOUT,
      label: <Link href={Paths.ABOUT}>About us</Link>,
      icon: <TeamOutlined style={{ color: '#5edaeb' }} />,
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
      key: Paths.REGISTRATION,
      label: (
        <Link href={Paths.REGISTRATION} onClick={handleLinkClick}>
          Sign up
        </Link>
      ),
      icon: <UserOutlined style={{ color: '#f5a60a' }} />,
    },
    {
      key: Paths.LOGIN,
      label: (
        <Link href={Paths.LOGIN} onClick={handleLinkClick}>
          Sign in
        </Link>
      ),
      icon: <LoginOutlined style={{ color: '#1ea620' }} />,
    },
  ];

  return (
    <>
      <List
        bordered
        dataSource={navigationMainPage}
        renderItem={(item) => (
          <List.Item>
            <Row justify="start" gutter={8}>
              <Col> {item.icon}</Col>
              <Col> {item.label}</Col>
            </Row>
          </List.Item>
        )}
      />
      <Row gutter={16} style={{ justifyContent: 'center', display: 'flex' }}>
        {promoCodes?.map((promo) => (
          <Col key={promo.id}>
            <Promo promo={promo} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
