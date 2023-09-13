import { Card } from 'antd';
import FontColors from '@/components/product/product.data';
import projectDescription from '../data/project-description';

interface ProjectDescriptionProps {
  description: typeof projectDescription;
}

const descriptionTitle = '🧸 About the project';

const ProjectDescription: React.FC<ProjectDescriptionProps> = ({ description }) => {
  return (
    <div style={{ flex: 1 }}>
      <Card title={descriptionTitle} style={{ color: FontColors.BASE, height: '100%' }}>
        <p
          dangerouslySetInnerHTML={{
            __html: description.about.replace(/\n/g, '<br /><br />'),
          }}
        ></p>
      </Card>
    </div>
  );
};

export default ProjectDescription;
