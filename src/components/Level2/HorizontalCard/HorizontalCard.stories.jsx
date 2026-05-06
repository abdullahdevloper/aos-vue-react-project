import { HorizontalCard } from './HorizontalCard';

export default {
  title: 'Components/Level2/HorizontalCard',
  component: HorizontalCard,
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
