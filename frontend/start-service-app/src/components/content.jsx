import React from 'react';
import Navbar from './navbar';
import { BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom';

const Content = () => {

    return (
       <div className='min-h-screen grid grid-cols-12 gap-2'>
          <div className='bg-gray-300 border-r col-span-2'>
             <Navbar />
          </div>
          <div className='p-24 col-span-10 flex justify-start'>
             <Outlet />
          </div>
       </div>
    );
}

export default Content;
