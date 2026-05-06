import { BarChart } from './BarChart';

export default {
  title: 'Components/Level2/BarChart',
  component: BarChart,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    linearStroke: { control: 'text' }
  },
};

export const Default = {
  args: {
    linearStroke: ""
  },
};
