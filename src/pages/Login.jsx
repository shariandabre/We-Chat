import React from 'react'
import { useNavigate,Link } from 'react-router-dom';
import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const Login = () => {



  
  const [err, seterr] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")

    } catch (error) {
      seterr(true)
    }
  };

  return (
    <div className="bg-indigo-200 h-screen flex items-center justify-center">
      <div className="bg-white py-5 px-16 rounded-md flex flex-col gap-3 items-center">
        <span className="text-gray-600 font-bold text-2xl">We Chat</span>
        <span className="text-gray-500 text-xs">Login</span>
        <form className="flex flex-col gap-3.5 " onSubmit={handleSubmit}>
          <input required className='p-3.5 outline-none border-b border-gray-200 w-61' type="email" placeholder="email" />
          <input required className='p-3.5 outline-none border-b border-gray-200 w-61' type="password" placeholder="password" />
          <button className='bg-indigo-400 text-white p-2.5 outline-none cursor-pointer' >Sign in</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p className='text-gray-500 text-sm'>
          You don't have an account? <Link to="/register" className="text-indigo-400">Sign up</Link> 
        </p>
      </div>
    </div>
  )
}
