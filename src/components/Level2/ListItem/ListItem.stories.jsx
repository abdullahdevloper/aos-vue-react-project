import { ListItem } from './ListItem';

export default {
  title: 'Components/Level2/ListItem',
  component: ListItem,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: { control: 'text' }
  },
};

export const Default = {
  args: {
    title: ""
  },
};
