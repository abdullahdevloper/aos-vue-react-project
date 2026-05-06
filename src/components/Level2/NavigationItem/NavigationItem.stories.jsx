import { NavigationItem } from './NavigationItem';

export default {
  title: 'Components/Level2/NavigationItem',
  component: NavigationItem,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    href: { control: 'text' }
  },
};

export const Default = {
  args: {
    href: ""
  },
};
