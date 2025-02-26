import React from 'react';
import Navbar from './navbar';
import Header from './header';
import { BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom';

const Content = () => {

    return (
       <div className='min-h-screen grid grid-cols-12'>
          <div className='border-r col-span-2'>
             <Navbar />
          </div>
          <div className='bg-gray-50 px-24 col-span-10'>
	     <Header />
             <Outlet />
          </div>
       </div>
    );
}

export default Content;
