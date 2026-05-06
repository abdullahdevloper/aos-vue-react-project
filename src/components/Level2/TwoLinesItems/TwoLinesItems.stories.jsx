import { TwoLinesItems } from './TwoLinesItems';

export default {
  title: 'Components/Level2/TwoLinesItems',
  component: TwoLinesItems,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    icon: { control: 'text' }
  },
};

export const Default = {
  args: {
    icon: ""
  },
};
