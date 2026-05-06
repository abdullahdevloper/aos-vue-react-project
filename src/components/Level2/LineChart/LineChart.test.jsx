import { render, screen } from '@testing-library/react';
import { LineChart } from './LineChart';

describe('LineChart', () => {
  it('renders without crashing', () => {
    render(<LineChart />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
