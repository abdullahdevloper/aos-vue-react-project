import { render, screen } from '@testing-library/react';
import { HeaderSettings } from './HeaderSettings';

describe('HeaderSettings', () => {
  it('renders without crashing', () => {
    render(<HeaderSettings />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
