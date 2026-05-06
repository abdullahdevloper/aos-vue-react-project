import { render, screen } from '@testing-library/react';
import { FooterSettings } from './FooterSettings';

describe('FooterSettings', () => {
  it('renders without crashing', () => {
    render(<FooterSettings />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
