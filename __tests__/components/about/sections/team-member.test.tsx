import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TeamMember from '../../../../components/about/sections/team-member';

window.matchMedia =
  window.matchMedia ||
  function matchMediaPolyfill() {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };

describe('TeamMember', () => {
  const mockMemberData = {
    name: 'test name',
    role: 'test role',
    bio: 'test bio',
    impact: ['test impact'],
    githubLink: 'https://test.com/link',
    photoURL: 'https://test.com/photo',
  };

  it('renders member name correctly', () => {
    render(<TeamMember member={mockMemberData} />);
    expect(screen.getByText(mockMemberData.name)).toBeInTheDocument();
  });

  it('renders GitHub link correctly', () => {
    render(<TeamMember member={mockMemberData} />);
    const linkElement = screen.getByRole('link', { name: /GitHub/i });
    expect(linkElement).toHaveAttribute('href', mockMemberData.githubLink);
    expect(linkElement).toHaveAttribute('target', '_blank');
  });

  it('renders avatar image correctly', () => {
    render(<TeamMember member={mockMemberData} />);
    const avatarImage = screen.getByRole('img');
    expect(avatarImage).toHaveAttribute('src', mockMemberData.photoURL);
  });

  it('renders member role correctly', () => {
    render(<TeamMember member={mockMemberData} />);
    expect(screen.getByText(mockMemberData.role)).toBeInTheDocument();
  });

  it('renders impact correctly', () => {
    render(<TeamMember member={mockMemberData} />);
    const impactElement = screen.getByText('✔️ test impact');
    expect(impactElement).toBeInTheDocument();
  });

  it('renders bio correctly', () => {
    render(<TeamMember member={mockMemberData} />);
    expect(screen.getByText('test bio')).toBeInTheDocument();
  });
});
