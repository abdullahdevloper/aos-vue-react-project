import { render, screen } from '@testing-library/react';
import { PolarareaChart } from './PolarareaChart';

describe('PolarareaChart', () => {
  it('renders without crashing', () => {
    render(<PolarareaChart />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
