import { VuseNeuAvatar } from './VuseNeuAvatar';

export default {
  title: 'Components/Level2/VuseNeuAvatar',
  component: VuseNeuAvatar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    src: { control: 'text' }
  },
};

export const Default = {
  args: {
    src: ""
  },
};
