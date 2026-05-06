import { LinearProgressAvatar } from './LinearProgressAvatar';

export default {
  title: 'Components/Level2/LinearProgressAvatar',
  component: LinearProgressAvatar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: { control: 'text' }
  },
};

export const Default = {
  args: {
    value: ""
  },
};
