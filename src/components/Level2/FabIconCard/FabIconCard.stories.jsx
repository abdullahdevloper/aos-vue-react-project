import { FabIconCard } from './FabIconCard';

export default {
  title: 'Components/Level2/FabIconCard',
  component: FabIconCard,
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
