"use client"

import Link from 'next/link';
import Image from 'next/image';
import userIcon from 'icons8-user-24.png';
import eyeIcon from 'icons8-show-password-50.png';
import Axios from "axios"
import { useRouter } from 'next/navigation';
const BASE_URL= process.env.BASE_URL


export default function Login() {
  const router= useRouter();
  
  async function postData_login(e){
    console.log("Function postData from login initiated");
    e.preventDefault();
    let email=document.querySelector("input[type='email']").value
   
    let password=document.querySelector("input[type='password']").value;
    localStorage.setItem('unique_email',email);
    
    try{
      const response= await Axios.post("https://stickynotesbackend-oy9o.onrender.com/api/login",{email,password});
      console.log('Response data:', response.data);

      alert(response.data.message);
      
      
      
      if(response.data.user){
      
        router.push("/sticky");
      }
      else if(!response.data.user){
        
      }
      else{

      }
    }
    catch(err){
      console.log(err);
    }

  }
  return (
    <div className="h-screen w-screen flex flex-col items-center bg-gradient-to-r from-blue-400 to-blue-500">
      <div className="h-96 w-96 mt-48 border border-gray-300 bg-white bg-opacity-80 flex flex-col items-center justify-center rounded-lg">
        <h2 className="text-3xl font-semibold text-blue-600 mb-6">Login</h2>
        <form>
        <div className="mb-4">
          <div className="flex items-center border rounded-lg px-3 py-2">
            <Image src={userIcon} alt="User Icon" width={24} height={24} />
            <input
              type="email"
              name="email"
              className="ml-2 border-none w-full focus:outline-none"
              placeholder=" Email"
            />
          </div>
        </div>
        <div className="mb-6">
          <div className="flex items-center border rounded-lg px-3 py-2">
            <Image src={eyeIcon} alt="Eye Icon" width={24} height={24} />
            <input
              type="password"
              name="password"
              className="ml-2 border-none w-full focus:outline-none"
              placeholder=" Password"
            />
          </div>
        </div>
        </form>
        <button 
        onClick={postData_login}
        className="w-32 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          Log In
        </button>
        
        <p className="text-gray-500 text-sm mt-4">
          Don't have an account?{' '}
          <Link href="/signup">Create a New Account

</Link>
          </p>
      </div>
    </div>
  );
}
