import React, { useContext, useState } from 'react'
import { db } from '../firebase';
import { collection, query, where, getDocs,getDoc, setDoc,doc, updateDoc } from 'firebase/firestore';
import { async } from '@firebase/util';
import { AuthContext } from '../context/AuthContext';

export const Search = () => {

    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);
    const {currentUser}=useContext(AuthContext);

    const handleSearch = async () => {
        const q = query(collection(db, "users"), where("displayName", "==", username));
        try {

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
                //console.log(doc.data())
            })
        } catch (error) {
            setErr(true)
        }
    }

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    }

    const handleSelect = async()=>{
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid

        try {
            
            const res = await getDoc(doc(db,"chats",combinedId));

            if(!res.exists()){
                await setDoc(doc(db,"chats",combinedId),{messages:[]});

               await updateDoc(doc(db,"userChats",currentUser.uid),{
                [combinedId+".userInfo"]:{
                    uid:user.uid,
                    displayName:user.displayName,
                    photoURL:user.photoURL
                }
               }) ;
               await updateDoc(doc(db,"userChats",user.uid),{
                [combinedId+".userInfo"]:{
                    uid:currentUser.uid,
                    displayName:currentUser.displayName,
                    photoURL:currentUser.photoURL
                }
               }) ;
            }
        } catch (error) {}
        setUser(null)
        setUsername("")
    }

    return (
        <div className='border-b border-gray-300'>
            <div className='p-3 '>
                <input type="text" className='bg-transparent outline-none placeholder:text-gray-500 text-gray-800 text-sm' placeholder='Find a user' onKeyDown={handleKey} onChange={e => setUsername(e.target.value)} value={username}/>
            </div>
            {err&&<span>User not found..</span>}
            {user && <div className='flex items-center text-base gap-3 p-3 cursor-pointer hover:bg-gray-200' onClick={handleSelect}>
                <img src={user.photoURL} className=' w-12 h-12 rounded-full object-cover'/>
                <div className=''>
                    <span className='text-gray-800 text-base'>{user.displayName}</span>
                </div>
            </div>}
        </div>
    )
}
