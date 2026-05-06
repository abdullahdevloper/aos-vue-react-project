import { render, screen } from '@testing-library/react';
import { RadarChart } from './RadarChart';

describe('RadarChart', () => {
  it('renders without crashing', () => {
    render(<RadarChart />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
