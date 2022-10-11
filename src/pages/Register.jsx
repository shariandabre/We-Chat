import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from 'react'
import { auth, storage,db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate , Link} from "react-router-dom";

export const Register = () => {

  const [err, seterr] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);


      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {

          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log('Upload is ' + progress + '% done');
          // switch (snapshot.state) {
          //   case 'paused':
          //     console.log('Upload is paused');
          //     break;
          //   case 'running':
          //     console.log('Upload is running');
          //     break;
          // }
        },
        (error) => {
          seterr(true)
        },
        () => {

          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL
            })
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL:downloadURL
            });
            await setDoc(doc(db,"userChats",res.user.uid),{});
            navigate("/");
          });
        }
      );
    } catch (error) {
      seterr(true)
    }
  };

  return (
    <div className="bg-indigo-200 h-screen flex items-center justify-center">
      <div className="bg-white py-5 px-16 rounded-xl flex flex-col gap-3 w-2/6 items-center">
        <span className="text-gray-600 font-bold text-2xl">We Chat</span>
        <span className="text-gray-500 text-xs">Register</span>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 w-5/6">
          <input required className='p-3.5 outline-none border-b border-gray-200 w-61' type="text" placeholder="display name" />
          <input required className='p-3.5 outline-none border-b border-gray-200 w-61' type="email" placeholder="email" />
          <input required className='p-3.5 outline-none border-b border-gray-200 w-61' type="password" placeholder="password" />
          <input className='p-3.5 outline-none border-b border-gray-200 w-61 hidden' type="file" id="file" />
          <label className='flex items-center gap-2 text-sm cursor-pointer text-gray-500' htmlFor="file"><img src='https://img.icons8.com/color/344/add-image.png ' className='w-8' />
            <span className=''>Add an avatar</span>
          </label>
          <button className='bg-indigo-400 text-white p-2.5 outline-none cursor-pointer' >Sign up</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p className='text-gray-500 text-sm'>
          You do have an account? <Link to="/login" className="text-indigo-400">Login</Link> 
        </p>
      </div>
    </div>
  )
}
