import React from 'react';
import Navbar from './navbar';
import Header from './header';
import { BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom';

const Content = () => {

    return (
       <div className='min-h-screen grid grid-cols-12 gap-2'>
          <div className='bg-indigo-50 border-r col-span-2'>
             <Navbar />
          </div>
          <div className='px-24 col-span-10'>
	     <Header />
             <Outlet />
          </div>
       </div>
    );
}

export default Content;
