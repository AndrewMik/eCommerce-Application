import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProjectDescription from '../../../../components/about/sections/project-description';

describe('ProjectDescription', () => {
  const mockDescriptionData = {
    about: 'Test about',
    technologies: {
      frontend: ['test0', 'test1'],
      bundling: ['test0', 'test1'],
      testing: ['test0', 'test1'],
      codeQuality: ['test0', 'test1'],
      styles: ['test0', 'test1'],
      backend: ['test0', 'test1'],
    },
    collaboration: 'Test collab',
  };

  it('renders without crashing', () => {
    render(<ProjectDescription description={mockDescriptionData} />);
    expect(screen.getByText('🧸 About the project')).toBeInTheDocument();
  });

  it('displays the correct text content', () => {
    render(<ProjectDescription description={mockDescriptionData} />);
    expect(screen.getByText('Test about')).toBeInTheDocument();
  });
});
