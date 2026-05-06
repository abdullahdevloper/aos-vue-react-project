import { render, screen } from '@testing-library/react';
import { LinearProgressContent } from './LinearProgressContent';

describe('LinearProgressContent', () => {
  it('renders without crashing', () => {
    render(<LinearProgressContent />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
