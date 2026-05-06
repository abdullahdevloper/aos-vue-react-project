import { render, screen } from '@testing-library/react';
import { Theme } from './Theme';

describe('Theme', () => {
  it('renders without crashing', () => {
    render(<Theme />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
