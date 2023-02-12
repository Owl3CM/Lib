import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Service } from './Service';

export default {
  title: 'Examples/Page',
  component: Service,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Service>;

const Template: ComponentStory<typeof Service> = (args:any) => <Service {...args} />;

export const One = Template.bind({});
