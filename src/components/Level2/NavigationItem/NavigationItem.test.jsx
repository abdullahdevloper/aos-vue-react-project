import { render, screen } from '@testing-library/react';
import { NavigationItem } from './NavigationItem';

describe('NavigationItem', () => {
  it('renders without crashing', () => {
    render(<NavigationItem />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
