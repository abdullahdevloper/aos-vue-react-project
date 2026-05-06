import { render, screen } from '@testing-library/react';
import { FabIconCard } from './FabIconCard';

describe('FabIconCard', () => {
  it('renders without crashing', () => {
    render(<FabIconCard />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
