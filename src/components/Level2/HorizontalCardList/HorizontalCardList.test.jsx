import { render, screen } from '@testing-library/react';
import { HorizontalCardList } from './HorizontalCardList';

describe('HorizontalCardList', () => {
  it('renders without crashing', () => {
    render(<HorizontalCardList />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
