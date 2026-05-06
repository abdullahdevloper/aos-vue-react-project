import { render, screen } from '@testing-library/react';
import { BarChart } from './BarChart';

describe('BarChart', () => {
  it('renders without crashing', () => {
    render(<BarChart />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
