import { render, screen } from '@testing-library/react';
import { HorizontalCard } from './HorizontalCard';

describe('HorizontalCard', () => {
  it('renders without crashing', () => {
    render(<HorizontalCard />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
