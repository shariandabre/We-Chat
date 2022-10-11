import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Input } from "./Input";
import { Messages } from "./Messages";

export const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
     <div className="flex-[2_2_0%] border border-l-gray-300">
    { data.user.displayName && <div className="h-12 bg-gray-300 flex items-center p-3 text-gray-700">
         <span>{data.user?.displayName}</span>
       </div>} 
      {data.user.displayName  && <Messages />} 
      {data.user.displayName  && <Input />}   

      {!data.user.displayName &&<div className="bg-gray-200 flex h-full items-center justify-center" >
        <span className="text-white text-4xl">Select a user.</span></div>}
    
     </div>
    
  );
};
