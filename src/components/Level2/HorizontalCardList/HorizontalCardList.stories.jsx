import { HorizontalCardList } from './HorizontalCardList';

export default {
  title: 'Components/Level2/HorizontalCardList',
  component: HorizontalCardList,
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
