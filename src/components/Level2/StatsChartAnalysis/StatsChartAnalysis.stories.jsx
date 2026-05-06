import { StatsChartAnalysis } from './StatsChartAnalysis';

export default {
  title: 'Components/Level2/StatsChartAnalysis',
  component: StatsChartAnalysis,
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
