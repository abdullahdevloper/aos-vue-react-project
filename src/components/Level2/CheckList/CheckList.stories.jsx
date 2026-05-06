import { CheckList } from './CheckList';

export default {
  title: 'Components/Level2/CheckList',
  component: CheckList,
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
