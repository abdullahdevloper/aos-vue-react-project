import { CourseCard } from './CourseCard';

export default {
  title: 'Components/Level2/CourseCard',
  component: CourseCard,
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
