import { onSnapshot,doc } from 'firebase/firestore'
import React, { useContext,useEffect,useState } from 'react'
import { ChatContext } from '../context/ChatContext'
import { Message } from './Message'
import { db } from '../firebase'

export const Messages = () => {
  const [messages, setmessages] = useState([])
  const {data}=useContext(ChatContext);

  useEffect(()=>{
    const unSub = onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
      doc.exists() && setmessages(doc.data().messages)
    })
    return ()=>{
      unSub()
    }
  },[data.chatId])

  return (
    <div className='overflow-y-scroll bg-gray-200 p-3 h-[calc(100%-96px)] example'>
    
    {messages.map(m=>(
      <Message message={m} key={m.Id} />
    ))}
    
    </div>
  )
}
