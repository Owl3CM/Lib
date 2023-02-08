import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Service } from './Service';

export default {
  title: 'Example/Page',
  component: Service,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Service>;

const Template: ComponentStory<typeof Service> = (args:any) => <Service {...args} />;

export const LoggedOut = Template.bind({});
export const LoggedIn = Template.bind({});
