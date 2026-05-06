import { render, screen } from '@testing-library/react';
import { ListItem } from './ListItem';

describe('ListItem', () => {
  it('renders without crashing', () => {
    render(<ListItem />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
