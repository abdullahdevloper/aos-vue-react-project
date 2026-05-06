import { render, screen } from '@testing-library/react';
import { VuseNeuAvatar } from './VuseNeuAvatar';

describe('VuseNeuAvatar', () => {
  it('renders without crashing', () => {
    render(<VuseNeuAvatar />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
