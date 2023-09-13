import { App } from 'antd';
import Cart from '@/components/cart/cart';

const Page = (): JSX.Element => (
  <App notification={{ maxCount: 3 }}>
    <Cart />
  </App>
);

export default Page;
