import { render, screen } from '@testing-library/react';
import { UserSocialCard } from './UserSocialCard';

describe('UserSocialCard', () => {
  it('renders without crashing', () => {
    render(<UserSocialCard />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
