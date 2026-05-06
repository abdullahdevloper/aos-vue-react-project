import { render, screen } from '@testing-library/react';
import { DoughnutChart } from './DoughnutChart';

describe('DoughnutChart', () => {
  it('renders without crashing', () => {
    render(<DoughnutChart />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
