import { Collapse, Typography } from 'antd';

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

const CollapseHeaderColor = '#353535';

const Attributes: React.FC<ProductAttributesProps> = ({ description, ageRange, gender, material }) => {
  return (
    <Collapse defaultActiveKey={['1']} bordered={false}>
      <Panel
        header={
          <Text strong style={{ color: CollapseHeaderColor }}>
            {AttributesListHeaders.DESCRIPTION}
          </Text>
        }
        key="1"
      >
        <div
          dangerouslySetInnerHTML={{
            __html: description ? description.replace(/\n/g, '<br />') : '',
          }}
        ></div>
      </Panel>
      <Panel
        header={
          <Text strong style={{ color: CollapseHeaderColor }}>
            {AttributesListHeaders.AGE_RANGE}
          </Text>
        }
        key="2"
      >
        <Text>{ageRange}</Text>
      </Panel>
      <Panel
        header={
          <Text strong style={{ color: CollapseHeaderColor }}>
            {AttributesListHeaders.GENDER}
          </Text>
        }
        key="3"
      >
        <Text>{gender}</Text>
      </Panel>
      <Panel
        header={
          <Text strong style={{ color: CollapseHeaderColor }}>
            {AttributesListHeaders.MATERIAL}
          </Text>
        }
        key="4"
      >
        <Text>{material}</Text>
      </Panel>
    </Collapse>
  );
};

export default Attributes;
