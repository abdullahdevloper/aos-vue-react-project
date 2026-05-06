import { VuseSectionDefinition } from './VuseSectionDefinition';

export default {
  title: 'Components/Level2/VuseSectionDefinition',
  component: VuseSectionDefinition,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    breadcrumbs: { control: 'text' }
  },
};

export const Default = {
  args: {
    breadcrumbs: ""
  },
};
