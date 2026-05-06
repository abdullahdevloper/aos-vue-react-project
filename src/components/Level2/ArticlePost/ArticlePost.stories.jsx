import { ArticlePost } from './ArticlePost';

export default {
  title: 'Components/Level2/ArticlePost',
  component: ArticlePost,
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
