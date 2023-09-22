import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Attributes from '../../../components/product/attributes';

test('renders Attributes component', () => {
  const props = {
    description: 'Test Description',
    ageRange: 'Test Age Range',
    gender: 'Test Gender',
    material: 'Test Material',
  };

  render(<Attributes {...props} />);

  fireEvent.click(screen.getByText('Description'));
  fireEvent.click(screen.getByText('Age Range'));
  fireEvent.click(screen.getByText('Gender'));
  fireEvent.click(screen.getByText('Material'));

  expect(screen.getByText('Test Description')).toBeInTheDocument();
  expect(screen.getByText('Test Age Range')).toBeInTheDocument();
  expect(screen.getByText('Test Gender')).toBeInTheDocument();
  expect(screen.getByText('Test Material')).toBeInTheDocument();
});
