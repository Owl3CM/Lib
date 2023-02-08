import './service.css';
import React from 'react';
import { Button } from '../index';

type User = {
  name: string;
};

export const Service  = () => {
  return (
    <div className='col-center p-lg' >
        <Button label="لول" />
    </div>
  );
};
