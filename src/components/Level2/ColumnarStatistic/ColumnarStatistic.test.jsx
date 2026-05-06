import { render, screen } from '@testing-library/react';
import { ColumnarStatistic } from './ColumnarStatistic';

describe('ColumnarStatistic', () => {
  it('renders without crashing', () => {
    render(<ColumnarStatistic />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
