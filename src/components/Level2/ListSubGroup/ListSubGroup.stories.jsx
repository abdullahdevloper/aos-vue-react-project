import { ListSubGroup } from './ListSubGroup';

export default {
  title: 'Components/Level2/ListSubGroup',
  component: ListSubGroup,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    group: { control: 'text' }
  },
};

export const Default = {
  args: {
    group: ""
  },
};
