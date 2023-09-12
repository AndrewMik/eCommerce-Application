import { LineItem } from '@commercetools/platform-sdk';
import { Col, Divider, Row, Typography } from 'antd';
import { getPrice, getTotalItemPrice } from '../helpers/get-price';

interface Props {
  item: LineItem;
}

const { Title } = Typography;

const CartItem = ({ item }: Props) => {
  let imageUrl = '';
  if (item.variant.images) {
    imageUrl = item.variant.images[0].url;
  }

  return (
    <Row key={item.id}>
      <Col flex="250px">
        <img
          src={imageUrl}
          alt={item.name.en}
          style={{ width: 240, aspectRatio: 1, borderRadius: '1%', objectFit: 'cover' }}
        />
      </Col>
      <Col flex="auto" style={{ width: '250px' }}>
        <Title key={item.id} level={4} style={{ margin: 0 }}>
          {item.name.en}
        </Title>
        {getPrice(item)}
        <p>Quantity: {item.quantity}</p>
        <p>Subtotal: {getTotalItemPrice(item)}</p>
      </Col>
      <Divider />
    </Row>
  );
};

export default CartItem;
