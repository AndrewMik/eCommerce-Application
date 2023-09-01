import { Collapse, Typography } from 'antd';

import FontColors from './product.data';

const { Panel } = Collapse;
const { Text } = Typography;

interface ProductAttributesProps {
  description: string;
  ageRange: string;
  gender: string;
  material: string;
}

enum AttributesListHeaders {
  DESCRIPTION = 'Description',
  AGE_RANGE = 'Age Range',
  GENDER = 'Gender',
  MATERIAL = 'Material',
}

const Attributes: React.FC<ProductAttributesProps> = ({ description, ageRange, gender, material }) => {
  return (
    <Collapse defaultActiveKey={['1']} bordered={false}>
      <Panel
        header={
          <Text strong style={{ color: FontColors.BASE_BRIGHT }}>
            {AttributesListHeaders.DESCRIPTION}
          </Text>
        }
        key="1"
      >
        <div
          style={{ color: FontColors.BASE }}
          dangerouslySetInnerHTML={{
            __html: description ? description.replace(/\n/g, '<br />') : '',
          }}
        ></div>
      </Panel>
      <Panel
        header={
          <Text strong style={{ color: FontColors.BASE_BRIGHT }}>
            {AttributesListHeaders.AGE_RANGE}
          </Text>
        }
        key="2"
      >
        <Text style={{ color: FontColors.BASE }}>{ageRange}</Text>
      </Panel>
      <Panel
        header={
          <Text strong style={{ color: FontColors.BASE_BRIGHT }}>
            {AttributesListHeaders.GENDER}
          </Text>
        }
        key="3"
      >
        <Text style={{ color: FontColors.BASE }}>{gender}</Text>
      </Panel>
      <Panel
        header={
          <Text strong style={{ color: FontColors.BASE_BRIGHT }}>
            {AttributesListHeaders.MATERIAL}
          </Text>
        }
        key="4"
      >
        <Text style={{ color: FontColors.BASE }}>{material}</Text>
      </Panel>
    </Collapse>
  );
};

export default Attributes;
