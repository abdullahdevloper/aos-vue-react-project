import { render, screen } from '@testing-library/react';
import { FlexList } from './FlexList';

describe('FlexList', () => {
  it('renders without crashing', () => {
    render(<FlexList />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
