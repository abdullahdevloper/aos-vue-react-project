import { LinearProgressContent } from './LinearProgressContent';

export default {
  title: 'Components/Level2/LinearProgressContent',
  component: LinearProgressContent,
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
