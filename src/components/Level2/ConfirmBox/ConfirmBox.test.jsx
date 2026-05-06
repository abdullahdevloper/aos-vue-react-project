import { render, screen } from '@testing-library/react';
import { ConfirmBox } from './ConfirmBox';

describe('ConfirmBox', () => {
  it('renders without crashing', () => {
    render(<ConfirmBox />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
