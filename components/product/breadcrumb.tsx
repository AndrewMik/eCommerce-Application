import Link from 'next/link';

import { Breadcrumb } from 'antd';

import Paths from '../../utils/route-links';
import FontColors from './product.data';

interface ProductBreadcrumbProps {
  name: string;
}

enum BreadcrumbPathNames {
  CATALOG = 'Catalog',
  CATEGORY = 'Category',
  SUBCATEGORY = 'Subcategory',
}

const ProductBreadcrumb: React.FC<ProductBreadcrumbProps> = ({ name }) => {
  return (
    <Breadcrumb style={{ paddingBlock: 12, color: FontColors.BASE }}>
      <Breadcrumb.Item>
        <Link href={Paths.CATALOG}>{BreadcrumbPathNames.CATALOG}</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>{name}</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default ProductBreadcrumb;
