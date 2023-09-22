import { Card, Avatar, Typography, List, Space } from 'antd';

import FontColors from '../../product/product.data';
import teamMembers from '../data/team-member-data';

const { Title, Text } = Typography;

interface Props {
  member: (typeof teamMembers)[0];
}

const linkPlaceholder = 'GitHub';

const impactTitle = 'Impact';
const bioTitle = 'Bio';

const bulletEmoji = '✔️ ';

const TeamMember: React.FC<Props> = ({ member }) => {
  return (
    <div style={{ flex: 1 }}>
      <Card
        style={{ color: FontColors.BASE, height: '100%' }}
        title={member.name}
        extra={
          <a href={member.githubLink} target="_blank" rel="noopener noreferrer">
            {linkPlaceholder}
          </a>
        }
      >
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <Space align="center" style={{ flexDirection: 'column' }}>
            <Avatar src={member.photoURL} shape="circle" size={160} />
            <Text type="secondary">{member.role}</Text>
          </Space>
        </div>
        <Title level={5} style={{ color: FontColors.BASE_BRIGHT }}>
          {impactTitle}
        </Title>
        <List
          dataSource={member.impact}
          renderItem={(item) => (
            <List.Item style={{ color: FontColors.BASE }}>
              {bulletEmoji}
              {item}
            </List.Item>
          )}
        />
        <Title level={5} style={{ color: FontColors.BASE_BRIGHT }}>
          {bioTitle}
        </Title>
        <p
          dangerouslySetInnerHTML={{
            __html: member.bio.replace(/\n/g, '<br /><br />'),
          }}
        ></p>
      </Card>
    </div>
  );
};

export default TeamMember;
