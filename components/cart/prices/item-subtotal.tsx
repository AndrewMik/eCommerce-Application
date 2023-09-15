import { LineItem } from '@commercetools/platform-sdk';
import { getCurrency, getPrice } from '../helpers/get-price';

interface Props {
  item: LineItem;
  discountApplied: boolean;
}

const ItemSubtotal = ({ item, discountApplied }: Props) => {
  const currency = getCurrency(item.totalPrice);

  return (
    <p style={{ fontSize: 14, display: 'flex', alignItems: 'center' }}>
      <span style={{ marginRight: '5px' }}>Subtotal: </span>
      {discountApplied ? (
        <div style={{ color: 'black', fontSize: 20, display: 'flex' }}>
          <div style={{ textDecoration: 'line-through', marginRight: '5px' }}>
            {currency} {getPrice(item.price.value)}
          </div>
          <span style={{ fontSize: 20, color: 'green', fontWeight: 'bold' }}>
            {currency}
            {getPrice(item.totalPrice)}
          </span>
        </div>
      ) : (
        <span style={{ fontSize: 20, color: 'green', fontWeight: 'bold' }}>
          {currency}
          {getPrice(item.totalPrice)}
        </span>
      )}
    </p>
  );
};

export default ItemSubtotal;
