import { UserSocialCard } from './UserSocialCard';

export default {
  title: 'Components/Level2/UserSocialCard',
  component: UserSocialCard,
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
