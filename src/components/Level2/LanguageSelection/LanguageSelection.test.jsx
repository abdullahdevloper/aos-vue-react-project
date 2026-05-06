import { render, screen } from '@testing-library/react';
import { LanguageSelection } from './LanguageSelection';

describe('LanguageSelection', () => {
  it('renders without crashing', () => {
    render(<LanguageSelection />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
