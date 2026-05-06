import { ColumnarStatistic } from './ColumnarStatistic';

export default {
  title: 'Components/Level2/ColumnarStatistic',
  component: ColumnarStatistic,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    items: { control: 'text' }
  },
};

export const Default = {
  args: {
    items: ""
  },
};
