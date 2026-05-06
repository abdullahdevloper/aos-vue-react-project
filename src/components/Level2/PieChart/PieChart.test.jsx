import { render, screen } from '@testing-library/react';
import { PieChart } from './PieChart';

describe('PieChart', () => {
  it('renders without crashing', () => {
    render(<PieChart />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
