import { render, screen } from '@testing-library/react';
import { CheckList } from './CheckList';

describe('CheckList', () => {
  it('renders without crashing', () => {
    render(<CheckList />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
