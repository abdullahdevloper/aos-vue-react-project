import { FlexListItem } from './FlexListItem';

export default {
  title: 'Components/Level2/FlexListItem',
  component: FlexListItem,
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
