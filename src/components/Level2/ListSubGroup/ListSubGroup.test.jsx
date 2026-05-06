import { render, screen } from '@testing-library/react';
import { ListSubGroup } from './ListSubGroup';

describe('ListSubGroup', () => {
  it('renders without crashing', () => {
    render(<ListSubGroup />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
