import { render, screen } from '@testing-library/react';
import { BubbleChart } from './BubbleChart';

describe('BubbleChart', () => {
  it('renders without crashing', () => {
    render(<BubbleChart />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
