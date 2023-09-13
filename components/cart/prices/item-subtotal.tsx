import { LineItem } from '@commercetools/platform-sdk';
import { getCurrency, getPrice } from '../helpers/get-price';

interface Props {
  item: LineItem;
}

const ItemSubtotal = ({ item }: Props) => (
  <b style={{ fontSize: 20, color: 'green' }}>
    {getCurrency(item.totalPrice)}
    {getPrice(item.totalPrice)}
  </b>
);

export default ItemSubtotal;
