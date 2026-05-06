import { render, screen } from '@testing-library/react';
import { CartCard } from './CartCard';

describe('CartCard', () => {
  it('renders without crashing', () => {
    render(<CartCard />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
