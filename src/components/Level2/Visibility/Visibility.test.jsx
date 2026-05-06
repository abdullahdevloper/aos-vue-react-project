import { render, screen } from '@testing-library/react';
import { Visibility } from './Visibility';

describe('Visibility', () => {
  it('renders without crashing', () => {
    render(<Visibility />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
