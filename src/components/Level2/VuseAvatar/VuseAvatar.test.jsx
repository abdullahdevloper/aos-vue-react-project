import { render, screen } from '@testing-library/react';
import { VuseAvatar } from './VuseAvatar';

describe('VuseAvatar', () => {
  it('renders without crashing', () => {
    render(<VuseAvatar />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
