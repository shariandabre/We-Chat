import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

export const Message = ({message}) => {
  const {currentUser}=useContext(AuthContext)
  const {data}=useContext(ChatContext)
  const ref = useRef()
  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:"smooth"})
  },[message])
  return (
    <div ref={ref} className={`flex gap-3 mb-3 ${message.senderId === currentUser.uid && "owner"}`}>
        {/* <div className='flex flex-col mb-10 text-gray-100'>
          <img className='w-10 h-10 rounded-full object-cover' src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL}  />
        </div> */}
        <div className={`max-w-4/6 flex flex-col gap-3 ${message.senderId === currentUser.uid && "items-end"} `}>
        {message.Text &&  <p className={`max-w-max bg-white py-3 px-5 rounded-br-xl rounded-tr-xl rounded-bl-xl ${message.senderId === currentUser.uid && "ownerp"}`}>{message.Text}</p>}
        {message.image &&
          <img className='w-3/6 ' src={message.image} />}
        </div>
    </div>
  )
}
