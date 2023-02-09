import './service.css';
import React from 'react';
import { ApiService, Button  } from '../index';

export const Service  = () => {

  const service=React.useMemo(()=>{
    return new ApiService({ baseURL : 'https://jsonplaceholder.typicode.com',storageKey:'test',storage:localStorage})
  },[])



  return (
    <div className='col-center p-lg' >
        <Button label="لول"
        onClick={()=>{
          console.log((service.get));
          setTimeout(() => {
            service.get('/posts/1')
            .then((res:any)=>{
              console.log((service.get));
              console.log(res)
            })
          }, 1000);
          }}
        options={{
          activeBackgound: 'cyan',
          fontLOL: 15,
        }}
        />
     </div>
  );
};
