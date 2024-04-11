'use client'

import React, { useContext } from 'react';
import Link from 'next/link';
import { MyContext } from '@/Context/authContext';
import { useDispatch } from 'react-redux';
import { removeTodo } from '@/ReduxToolkit/Reducer/TodoReducer';

const Navbar = () => {
  const { state, dispatch } = useContext(MyContext);
  const dispatchT = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('UserToken');
    dispatch({ type: 'LOGOUT' });
    dispatchT(removeTodo());
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className='flex justify-around flex-wrap py-3 gap-y-2 max-sm:flex-col'>
      <h1 className='text-lg font-semibold text-center cursor-pointer'>Todo App</h1>
      <ul className='flex gap-x-10 justify-center max-sm:gap-x-6'>
        <li className='cursor-pointer'><Link href='/'>Home</Link></li>
        {state?.user?.name ? (
          <li className='cursor-pointer' onClick={handleLogout}>Logout</li>
        ) : (
          <li className='cursor-pointer'><Link href='/login'>Login</Link></li>
        )}
        <li className='cursor-pointer' onClick={() => scrollToSection('About')}>About</li>
        <li className='cursor-pointer' onClick={() => scrollToSection('About')}>Contact</li>
      </ul>
    </div>
  );
};

export default Navbar;
