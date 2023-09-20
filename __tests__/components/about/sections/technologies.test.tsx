import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Technologies from '../../../../components/about/sections/technologies';

const technologiesTitle = '🖥️ Technologies';

window.matchMedia =
  window.matchMedia ||
  function matchMediaPolyfill() {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };

describe('Technologies', () => {
  const mockTechnologiesData = {
    frontend: ['Frontend', 'test0'],
    bundling: ['Bundling', 'test1'],
    testing: ['Testing', 'test2'],
    codeQuality: ['Code Quality', 'test3'],
    styles: ['Styles', 'test4'],
    backend: ['Backend', 'test5'],
  };

  it('renders without crashing', () => {
    render(<Technologies technologies={mockTechnologiesData} />);
    expect(screen.getByText(technologiesTitle)).toBeInTheDocument();
  });
});
