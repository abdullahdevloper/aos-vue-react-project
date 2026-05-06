import { render, screen } from '@testing-library/react';
import { StatsChartAnalysis } from './StatsChartAnalysis';

describe('StatsChartAnalysis', () => {
  it('renders without crashing', () => {
    render(<StatsChartAnalysis />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
