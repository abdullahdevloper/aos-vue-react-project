import { ItemIcon } from './ItemIcon';

export default {
  title: 'Components/Level2/ItemIcon',
  component: ItemIcon,
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
