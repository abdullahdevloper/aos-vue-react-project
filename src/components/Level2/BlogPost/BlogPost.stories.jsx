import { BlogPost } from './BlogPost';

export default {
  title: 'Components/Level2/BlogPost',
  component: BlogPost,
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
