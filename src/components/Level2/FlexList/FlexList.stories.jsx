import { FlexList } from './FlexList';

export default {
  title: 'Components/Level2/FlexList',
  component: FlexList,
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
