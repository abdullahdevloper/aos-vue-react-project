import { render, screen } from '@testing-library/react';
import { VuseLogo } from './VuseLogo';

describe('VuseLogo', () => {
  it('renders without crashing', () => {
    render(<VuseLogo />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
