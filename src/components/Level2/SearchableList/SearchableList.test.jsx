import { render, screen } from '@testing-library/react';
import { SearchableList } from './SearchableList';

describe('SearchableList', () => {
  it('renders without crashing', () => {
    render(<SearchableList />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
