import { useState } from 'react';
import EmptyCart from './empty-cart/empty-cart';

const Cart = () => {
  // data from CT will be used for isCartEmpty state
  const [isCartEmpty] = useState<boolean>(true);

  return isCartEmpty ? <EmptyCart /> : <div />;
};

export default Cart;
