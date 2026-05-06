import { ProductDetailsCard } from './ProductDetailsCard';

export default {
  title: 'Components/Level2/ProductDetailsCard',
  component: ProductDetailsCard,
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
