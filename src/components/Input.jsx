import React, { useState } from 'react'
import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthContext'
import { async } from '@firebase/util'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { v4 as uuid} from 'uuid'
import { ref } from 'firebase/storage'
import { storage } from '../firebase'
import { uploadBytesResumable ,getDownloadURL} from 'firebase/storage'
export const Input = () => {

  const [Text,setText] = useState("");
  const [image,setimage]=useState(null);

  const {currentUser}=useContext(AuthContext)
  const {data}=useContext(ChatContext)

  const handleSend = async () => {
    if (image) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                Text,
                senderId: currentUser.uid,
                image: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          Text,
          senderId: currentUser.uid,
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        Text,
      },

    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        Text,
      },

    });

    setText("");
    setimage(null);
  };
  let button;
  if (Text||image) {
    button = <button className='px-2 py-2 bg-indigo-400 text-white rounded-lg' onClick={handleSend}>Send</button>;
  } 

  return (

    <div className='h-12 p-3 bg-gray-50 flex items-center justify-between '>
        <input required type="text" placeholder='Type something...' className='w-4/6 bg-gray-50
            border-none outline-none text-lg text-gray-800
            ' onChange={e=>setText(e.target.value)}
            value={Text}/>
        <div className='flex items-center gap-3'>
            <img src='https://cdn-icons-png.flaticon.com/512/149/149284.png' className=' h-6'/>
            <input type="file" style={{display:"none"}} id="file"  onChange={e=>setimage(e.target.files[0])}/>
            <label htmlFor="file">
                <img src="https://cdn-icons-png.flaticon.com/512/685/685668.png" className='h-6'/>
            </label>
          {button}  

        </div>
    </div>
  )
}
