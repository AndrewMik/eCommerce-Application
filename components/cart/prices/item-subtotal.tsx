import { LineItem, ProductDiscountReference, TypedMoney } from '@commercetools/platform-sdk';
import { getCurrency, getPrice } from '../helpers/get-price';

interface DiscountedPrice {
  value: TypedMoney;
  discount: ProductDiscountReference;
}
interface LineItemExpanded extends LineItem {
  discountedPrice?: DiscountedPrice;
}

interface Props {
  isPromoExists: boolean;
  item: LineItemExpanded;
}

const ItemSubtotal = ({ item }: Props) => {
  return (
    <b style={{ fontSize: 20, color: 'green' }}>
      {getCurrency(item.totalPrice)}
      {getPrice(item.totalPrice)}
    </b>
  );
};

export default ItemSubtotal;
