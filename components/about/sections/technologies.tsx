import { Card, List, Typography } from 'antd';

import FontColors from '@/components/product/product.data';
import projectDescription from '../data/project-description';

const { Text } = Typography;

interface TechnologiesProps {
  technologies: typeof projectDescription.technologies;
}

const technologiesTitle = '🖥️ Technologies';

const Technologies: React.FC<TechnologiesProps> = ({ technologies }) => {
  return (
    <div style={{ flex: 1 }}>
      <Card title={technologiesTitle} style={{ color: FontColors.BASE, height: '100%' }}>
        <List
          dataSource={Object.values(technologies)}
          renderItem={(tech) => (
            <List.Item style={{ color: FontColors.BASE }}>
              <Text strong style={{ color: FontColors.BASE }}>
                {tech[0]}
              </Text>
              : {tech[1]}
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default Technologies;
