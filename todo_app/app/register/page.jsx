'use client'

import React, { useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
// _app.js
import 'react-toastify/dist/ReactToastify.css';


function Register() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      console.log('dfdfdfd');
      return toast.error('password and confirmpassword did not match')
    }

    // Here you can perform form validation, API calls, etc.
    // For demonstration purposes, let's just log the values
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);

    try {
      const responce = await axios.post('/authenticate/register', { name, email, password })
      if (responce.data.success) {
        router.push('/login')
        toast.success('Registration Successful')
      }
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <>
      <ToastContainer position="top-center"
        autoClose={2000} />
      <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold mb-1">Name:</label>
            <input type="text" id="name" ref={nameRef} required className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-1">Email:</label>
            <input type="email" id="email" ref={emailRef} required className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold mb-1">Password:</label>
            <input type="password" id="password" ref={passwordRef} required className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400" />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-1">Confirm Password:</label>
            <input type="password" id="confirmPassword" ref={confirmPasswordRef} required className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400" />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600" >Register</button>
        </form>
        <p className="mt-4 text-sm">Already have an account <Link href="/login"><span className="text-blue-500">Login here</span></Link></p>
      </div>
    </>
  );
}

export default Register;
