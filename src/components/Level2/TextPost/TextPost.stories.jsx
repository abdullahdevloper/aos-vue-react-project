import { TextPost } from './TextPost';

export default {
  title: 'Components/Level2/TextPost',
  component: TextPost,
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
