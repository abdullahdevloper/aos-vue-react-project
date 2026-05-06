import { UserProfileCard } from './UserProfileCard';

export default {
  title: 'Components/Level2/UserProfileCard',
  component: UserProfileCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    maxWidth: { control: 'text' }
  },
};

export const Default = {
  args: {
    maxWidth: ""
  },
};
