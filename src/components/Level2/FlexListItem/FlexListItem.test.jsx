import { render, screen } from '@testing-library/react';
import { FlexListItem } from './FlexListItem';

describe('FlexListItem', () => {
  it('renders without crashing', () => {
    render(<FlexListItem />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
