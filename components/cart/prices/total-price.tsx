import { Cart } from '@commercetools/platform-sdk';
import { getCurrency, getPrice } from '../helpers/get-price';

interface Props {
  cart: Cart;
}

const TotalPrice = ({ cart }: Props) => (
  <b style={{ color: 'blue' }}>
    {getCurrency(cart.totalPrice)}
    {getPrice(cart.totalPrice)}
  </b>
);

export default TotalPrice;
