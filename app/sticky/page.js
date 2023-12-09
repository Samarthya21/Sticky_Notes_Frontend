"use client"
import React, { useState,useEffect } from "react";
import Image from 'next/image';
import Note from "note.js";
import Axios from "axios"
import { useRouter } from 'next/navigation';
const BASE_URL=process.env.BASE_URL

export default function Sticky() {
  const router=useRouter();
  function handleClick(){
    localStorage.setItem("unique_email","");
    router.push(`${BASE_URL}/login`);
  }
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  function onClickButton() {
    
    setNotes((prevNotes) => [...prevNotes, { title: "", content: "" }]);
  }
  async function postData(){
    let email=localStorage.getItem("unique_email")
    try{
      if(!email){
        return(
          <div>Not Authorized Go to Login Page for Authentication</div>
        )
      }
      let response=await Axios.post("https://stickynotesbackend-oy9o.onrender.com/api/create",{unique_email:email});
      setNotes(response.data);
      setLoading(false); 
      console.log(response.data)
      console.log(notes);
    }
    catch(err){
      console.log(err)
      setLoading(false);
    }

  }
  useEffect(() => {
    console.log(notes)
    postData();
  }, []); 
  if (loading) {
    return <div>Loading...</div>;
  }

  return (

    <div className="h-screen w-screen">
      <div>
        <nav className="bg-blue-500 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <a href="#" className="text-2xl font-bold text-white">Hello</a>
            <ul className="hidden md:flex space-x-4">
              <li><a href="#" className="text-white">New Note</a></li>
              <li><a href="#" className="text-white">Contact</a></li>
            </ul>
            <div>
            <button onClick={handleClick}>
              LogOut
            </button>
            </div>
           
          </div>
        </nav>
      </div>
      <div className="flex flex-col justify-center m-10 items-center">
        <button className="w-32 py-2 text-white bg-purple-600 rounded-lg hover:bg-blue-700"
          onClick={onClickButton}
        >
          New Note
        </button>
      </div>
      <div className="ml-24 flex flex-wrap">
      {notes.map((note, index) => (
      <div key={index} className="m-2">
        <Note title={note.title} content={note.content} number={index}/>
      </div>
  ))}
</div>
    </div>
  );
}
