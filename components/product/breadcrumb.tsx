import Link from 'next/link';

import { Breadcrumb } from 'antd';

import { Paths } from '../../utils/route-links';

interface ProductBreadcrumbProps {
  name: string;
}

const ProductBreadcrumb: React.FC<ProductBreadcrumbProps> = ({ name }) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link href={Paths.CATALOG}>Catalog</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>{name}</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default ProductBreadcrumb;
