import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch }= useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect =(u)=>{
    dispatch({type:"CHANGE_USER",payload:u})
  }
  
  return (
    <div className="chats">
        {Object.entries(chats)?.map((chat)=>(
      <div key={chat[0]} className="flex items-center gap-3  text-gray-800 p-3 cursor-pointer  hover:bg-gray-300" onClick={()=>handleSelect(chat[1].userInfo)}>
        <img
          src={chat[1].userInfo.photoURL}
          className=" w-12 h-12 rounded-full object-cover"
        />
        <div className="">
          <span className="text-base font-medium marker:">{chat[1].userInfo.displayName}</span>
          <p className="text-sm text-gray-400">{chat[1].lastMessage?.Text}</p>
        </div>
      </div>
        ))}
    </div>
  );
};
