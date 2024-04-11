'use client'


import React, { useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const router = useRouter()

  const handleSubmit =async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;


    try {
      const responce = await axios.post('/authenticate/login', {email, password})
      if (responce.data.success) {
        localStorage.setItem('UserToken', JSON.stringify(responce.data.token))
        router.push('/')
        toast.success('Login Successful')
      }
      else{
        toast.error(responce.data.msg)
      }
    } catch (error) {
      
    }
    
  };

  return (
    <>
    <ToastContainer position="top-center"
        autoClose={2000} />
    
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold mb-1">Email:</label>
          <input type="email" id="email" ref={emailRef} required className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400" />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-semibold mb-1">Password:</label>
          <input type="password" id="password" ref={passwordRef} required className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400" />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Login</button>
      </form>
      <p className="mt-4 text-sm">Don&apos;t have an account? <Link href="/register"><span className="text-blue-500">Register here</span></Link></p>

    </div>
    </>
  );
}

export default Login;

