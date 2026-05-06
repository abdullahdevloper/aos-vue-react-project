import { render, screen } from '@testing-library/react';
import { HorizontalBarChart } from './HorizontalBarChart';

describe('HorizontalBarChart', () => {
  it('renders without crashing', () => {
    render(<HorizontalBarChart />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
