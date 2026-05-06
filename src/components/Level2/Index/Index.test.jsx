import { render, screen } from '@testing-library/react';
import { Index } from './Index';

describe('Index', () => {
  it('renders without crashing', () => {
    render(<Index />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
