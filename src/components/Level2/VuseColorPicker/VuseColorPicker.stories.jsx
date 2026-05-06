import { VuseColorPicker } from './VuseColorPicker';

export default {
  title: 'Components/Level2/VuseColorPicker',
  component: VuseColorPicker,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    resetNeu: { control: 'text' }
  },
};

export const Default = {
  args: {
    resetNeu: ""
  },
};
