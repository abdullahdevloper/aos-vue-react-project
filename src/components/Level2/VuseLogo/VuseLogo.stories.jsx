import { VuseLogo } from './VuseLogo';

export default {
  title: 'Components/Level2/VuseLogo',
  component: VuseLogo,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: { control: 'text' }
  },
};

export const Default = {
  args: {
    size: ""
  },
};
