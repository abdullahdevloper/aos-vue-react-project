import { DoughnutChart } from './DoughnutChart';

export default {
  title: 'Components/Level2/DoughnutChart',
  component: DoughnutChart,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    gradientFill: { control: 'text' }
  },
};

export const Default = {
  args: {
    gradientFill: ""
  },
};
