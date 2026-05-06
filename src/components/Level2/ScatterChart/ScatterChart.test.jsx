import { render, screen } from '@testing-library/react';
import { ScatterChart } from './ScatterChart';

describe('ScatterChart', () => {
  it('renders without crashing', () => {
    render(<ScatterChart />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
