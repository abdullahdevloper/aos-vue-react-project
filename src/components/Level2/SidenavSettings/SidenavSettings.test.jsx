import { render, screen } from '@testing-library/react';
import { SidenavSettings } from './SidenavSettings';

describe('SidenavSettings', () => {
  it('renders without crashing', () => {
    render(<SidenavSettings />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
