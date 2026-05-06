import { SearchableList } from './SearchableList';

export default {
  title: 'Components/Level2/SearchableList',
  component: SearchableList,
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
