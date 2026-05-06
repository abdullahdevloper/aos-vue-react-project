import { BasicStatistic } from './BasicStatistic';

export default {
  title: 'Components/Level2/BasicStatistic',
  component: BasicStatistic,
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
