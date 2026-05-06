import { render, screen } from '@testing-library/react';
import { BasicStatistic } from './BasicStatistic';

describe('BasicStatistic', () => {
  it('renders without crashing', () => {
    render(<BasicStatistic />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
