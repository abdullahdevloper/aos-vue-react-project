import { render, screen } from '@testing-library/react';
import { CountDown } from './CountDown';

describe('CountDown', () => {
  it('renders without crashing', () => {
    render(<CountDown />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
