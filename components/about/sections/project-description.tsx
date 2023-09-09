interface ProjectDescriptionProps {
  description: string;
}

const ProjectDescription: React.FC<ProjectDescriptionProps> = ({ description }) => (
  <div>
    <h2>About the Project</h2>
    <p>{description}</p>
  </div>
);

export default ProjectDescription;
