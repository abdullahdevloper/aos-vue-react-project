import { render, screen } from '@testing-library/react';
import { ProductDetailsCard } from './ProductDetailsCard';

describe('ProductDetailsCard', () => {
  it('renders without crashing', () => {
    render(<ProductDetailsCard />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
