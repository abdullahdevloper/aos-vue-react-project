import { CartCard } from './CartCard';

export default {
  title: 'Components/Level2/CartCard',
  component: CartCard,
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
