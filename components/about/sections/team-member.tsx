import { Card } from 'antd';

interface TeamMemberProps {
  member: {
    name: string;
    role: string;
    bio: string;
    impact: string;
    githubLink: string;
    photoURL: string;
  };
}

const TeamMember: React.FC<TeamMemberProps> = ({ member }) => (
  <Card hoverable style={{ width: 240 }} cover={<img alt={member.name} src={member.photoURL} />}>
    <Card.Meta
      title={member.name}
      description={`
        Role: ${member.role}
        Bio: ${member.bio}
        Impact: ${member.impact}
        GitHub: <a href=${member.githubLink}>Profile</a>
      `}
    />
  </Card>
);

export default TeamMember;
