import { render, screen } from '@testing-library/react';
import { TextPost } from './TextPost';

describe('TextPost', () => {
  it('renders without crashing', () => {
    render(<TextPost />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
