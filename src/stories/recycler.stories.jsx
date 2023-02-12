import React from 'react';
import { Recycler } from './Recycler';

export default {
  title: 'Examples/Recycler',
  component: Recycler,
} 

const Template=  (args) => <Recycler {...args} />;

export const One = Template.bind({});
