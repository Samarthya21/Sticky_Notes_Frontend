import Image from "next/image"
import  Axios  from 'axios';
import React, { useState } from 'react';


export default function Note({title,content,number}) {
  const [title_of, setTitle] = useState(title || '');
  const [content_of, setContent] = useState(content || '');
  const unique_email= localStorage.getItem('unique_email');  

  async function postData(e) {
    e.preventDefault();
    try {
      let response = await Axios.post("https://stickynotesbackend-oy9o.onrender.com/api/read", {
      title: title_of,
      content: content_of,
      unique_email:unique_email,
      key_read:number
    
});

        
      
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteData(e){
    e.preventDefault();
    try{
      let response=await Axios.post("https://stickynotesbackend-oy9o.onrender.com/api/del",{
        unique_email:unique_email,
        key_read:number
      })
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className="m-2 h-96 w-96 border border-8 border-double border-black rounded-lg shadow-lg p-4 relative">
    <div className="mb-4 border-b-2 border-black ">
    <img src="https://img.icons8.com/?size=512&id=99961&format=png" 
    className="cursor-pointer"
    onClick={deleteData}
    width={30}
    height={30}
    ></img>

    </div>
    
    
    <form className="h-full w-full">
      <label className="block text-xl font-semibold text-gray-700 mb-4">Enter your title:</label>
      <input
        type="text"
        className="font-serif w-full h-10 border border-4 border-purple-600 rounded-md p-2 focus:outline-none focus:ring focus:border-purple-600"
        placeholder="Title"
        value={title_of}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label className="font-serif block text-xl font-semibold text-gray-700 mb-4 mt-4">Enter your content:</label>
      <textarea
        className="w-full h-full border border-4 border-purple-600 rounded-md p-2 focus:outline-none focus:ring focus:border-purple-600"
        placeholder="Write your content here"
        value={content_of}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={postData}
        className="mt-2 w-full py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
        type="submit"
      >
        Submit
      </button>
    </form>
    <p className="font font-serif">{number} Hello </p>
  </div>
  
  
    );
}
