import { VuseAvatar } from './VuseAvatar';

export default {
  title: 'Components/Level2/VuseAvatar',
  component: VuseAvatar,
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
