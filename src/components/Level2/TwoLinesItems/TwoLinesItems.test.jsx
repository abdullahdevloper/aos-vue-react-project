import { render, screen } from '@testing-library/react';
import { TwoLinesItems } from './TwoLinesItems';

describe('TwoLinesItems', () => {
  it('renders without crashing', () => {
    render(<TwoLinesItems />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
