import { HorizontalBarChart } from './HorizontalBarChart';

export default {
  title: 'Components/Level2/HorizontalBarChart',
  component: HorizontalBarChart,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    gradients: { control: 'text' }
  },
};

export const Default = {
  args: {
    gradients: ""
  },
};
