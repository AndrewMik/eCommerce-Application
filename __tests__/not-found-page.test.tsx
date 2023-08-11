import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Error404 from '../app/not-found';

describe('Error 404', () => {
  test('displays the "Not Found" page correctly', () => {
    render(<Error404 />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Sorry, the page you visited does not exist.')).toBeInTheDocument();

    const backButton = screen.getByRole('button', { name: 'Back Home' });
    expect(backButton).toBeInTheDocument();
  });
});
