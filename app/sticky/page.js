"use client"
import React, { useState,useEffect } from "react";
import Image from 'next/image';
import Note from "/Users/samarthyaalok/Desktop/sticky_notes/note.js";
import Axios from "axios"

export default function Sticky() {
  const [notes, setNotes] = useState([]);

  function onClickButton() {
    
    setNotes((prevNotes) => [...prevNotes, { title: "", content: "" }]);
  }
  async function postData(){
    let email=localStorage.getItem("unique_email")
    try{
      let response=await Axios.post("http://localhost:8080/api/create",{unique_email:email});
      setNotes(prevNotes => [...prevNotes, ...response.data]);
      console.log(response.data)
      console.log(notes);
    }
    catch(err){
      console.log(err)
    }

  }
  useEffect(() => {
    console.log(notes)
    postData();
  }, []); 

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
        <Note title={note.title} content={note.content} />
      </div>
  ))}
</div>
    </div>
  );
}
