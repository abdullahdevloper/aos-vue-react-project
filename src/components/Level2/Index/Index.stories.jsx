import { Index } from './Index';

export default {
  title: 'Components/Level2/Index',
  component: Index,
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
