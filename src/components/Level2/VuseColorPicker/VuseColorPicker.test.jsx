import { render, screen } from '@testing-library/react';
import { VuseColorPicker } from './VuseColorPicker';

describe('VuseColorPicker', () => {
  it('renders without crashing', () => {
    render(<VuseColorPicker />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
