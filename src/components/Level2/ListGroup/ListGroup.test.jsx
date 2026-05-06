import { render, screen } from '@testing-library/react';
import { ListGroup } from './ListGroup';

describe('ListGroup', () => {
  it('renders without crashing', () => {
    render(<ListGroup />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
