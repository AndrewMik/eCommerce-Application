import { Row, Col, Space } from 'antd';
import teamMembers from './data/team-member-data';
import TeamMember from './sections/team-member';
import ProjectDescription from './sections/project-description';
import projectDescription from './data/project-description';
import Technologies from './sections/technologies';
import Collaboration from './sections/collaboration';

const TeamPage: React.FC = () => {
  return (
    <div style={{ maxWidth: 1400, paddingInline: 10, marginInline: 'auto', marginBlock: '60px 40px' }}>
      <Space direction="vertical" size={'middle'} style={{ display: 'flex' }}>
        <Row gutter={[16, 16]}>
          <Col md={24} lg={16} style={{ display: 'flex' }}>
            <ProjectDescription description={projectDescription} />
          </Col>
          <Col xs={24} lg={8} style={{ display: 'flex' }}>
            <Technologies technologies={projectDescription.technologies} />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          {teamMembers.map((member) => (
            <Col md={24} lg={8} key={member.name} style={{ display: 'flex' }}>
              <TeamMember member={member} />
            </Col>
          ))}
        </Row>
        <Collaboration collaboration={projectDescription.collaboration} />
      </Space>
    </div>
  );
};

export default TeamPage;
