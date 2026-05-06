import { render, screen } from '@testing-library/react';
import { ArticlePost } from './ArticlePost';

describe('ArticlePost', () => {
  it('renders without crashing', () => {
    render(<ArticlePost />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
