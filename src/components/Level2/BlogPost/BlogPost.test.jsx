import { render, screen } from '@testing-library/react';
import { BlogPost } from './BlogPost';

describe('BlogPost', () => {
  it('renders without crashing', () => {
    render(<BlogPost />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
