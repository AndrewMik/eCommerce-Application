import { Row, Col } from 'antd';
import teamMembers from './data/team-member-data';
import TeamMember from './sections/team-member';
import ProjectDescription from './sections/project-description';
import projectDescription from './data/project-description';

const TeamPage: React.FC = () => (
  <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
    <ProjectDescription description={projectDescription} />
    <h2>Meet the Team</h2>
    <Row gutter={16}>
      {teamMembers.map((member) => (
        <Col xs={24} sm={12} md={8} key={member.name}>
          <TeamMember member={member} />
        </Col>
      ))}
    </Row>
  </div>
);

export default TeamPage;
