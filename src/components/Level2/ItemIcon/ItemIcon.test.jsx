import { render, screen } from '@testing-library/react';
import { ItemIcon } from './ItemIcon';

describe('ItemIcon', () => {
  it('renders without crashing', () => {
    render(<ItemIcon />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
