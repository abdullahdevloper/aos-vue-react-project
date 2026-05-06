import { render, screen } from '@testing-library/react';
import { LinearProgressAvatar } from './LinearProgressAvatar';

describe('LinearProgressAvatar', () => {
  it('renders without crashing', () => {
    render(<LinearProgressAvatar />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
