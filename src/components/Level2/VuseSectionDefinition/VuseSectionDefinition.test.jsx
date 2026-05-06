import { render, screen } from '@testing-library/react';
import { VuseSectionDefinition } from './VuseSectionDefinition';

describe('VuseSectionDefinition', () => {
  it('renders without crashing', () => {
    render(<VuseSectionDefinition />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  // TODO: إضافة المزيد من الاختبارات
});
