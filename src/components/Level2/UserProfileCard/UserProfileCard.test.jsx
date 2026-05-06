import { render, screen } from '@testing-library/react';
import { UserProfileCard } from './UserProfileCard';

describe('UserProfileCard', () => {
  it('renders without crashing', () => {
    render(<UserProfileCard />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
