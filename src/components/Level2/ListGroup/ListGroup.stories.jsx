import { ListGroup } from './ListGroup';

export default {
  title: 'Components/Level2/ListGroup',
  component: ListGroup,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    group: { control: 'text' }
  },
};

export const Default = {
  args: {
    group: ""
  },
};
