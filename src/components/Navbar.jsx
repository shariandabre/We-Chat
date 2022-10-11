import { getAuth } from "firebase/auth";
import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { onAuthStateChanged } from "firebase/auth";
import { useState,useEffect } from 'react';

export const Navbar = () => {
const {currentUser}=useContext(AuthContext)

//const user = auth.currentUser;

  return (
    <div className='flex items-center bg-gray-200 h-12 p-3 justify-between '>
        <span className='font-bold text-xl text-gray-500'>
            We Chat
        </span>
        <div className='flex gap-4 flex items-center'>
          <span className="text-gray-800 text-lg flex flex-row gap-1">
            <img src={currentUser.photoURL} className='h-8 w-8 rounded-full object-cover'/>
            
               {currentUser.displayName}
            </span>
            <button className='bg-indigo-300 rounded-lg px-3 py-2 border-none text-xs ' onClick={()=>signOut(auth)} >
                LogOut
            </button>
        </div>
    </div>
  )
}
