"use client"
import Loader from '@/components/common/Loader/Loader';
import * as React from 'react';

const Loading = () => {
  return (
    <>
     <div className='bg-white h-screen'>
     <Loader/>
    </div>
    </>
  );
};

export default Loading;
