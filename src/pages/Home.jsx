import React from 'react'
import { Chat } from '../components/Chat'
import { Sidebar } from '../components/Sidebar'

export const Home = () => {
  return (
    <div className='bg-indigo-200 h-screen flex justify-center items-center'>
      <div className='rounded-xl w-5/6 h-5/6 flex overflow-hidden'>
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}
