'use client'
import Link from "next/link"
import React from "react";
import { useEffect } from 'react'
import { useRouter } from "next/navigation";
import axios from "axios";






export default function LoginPage(){
    const router=useRouter();

    const [user,setUser]=React.useState({
        email:"",
        password:"",
    
    })
         const [buttonDisabled,setButtonDisabled]=React.useState(false);
         const [loading, setloading]=React.useState(false);
    
    const onLogin = async()=>{

               try{
                setloading(true);
                 const response=   await   axios.post("/api/users/login",user);
             
                 console.log("login success",response.data)
                
                 toast.success("Login Success");
                 router.push("/profile");
                


               }   catch(error){

               }
            }
                   useEffect(()=>{
                if(user.email.length>0 && user.password.length>0){
                    setButtonDisabled(false);
                }  else{
                    setButtonDisabled(true);
                }
                   } ,[user]);

  
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing":"Login"}</h1>
            <hr />
           
            <label htmlFor="email">
                email
               </label>
            <input className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" id="email"
            type="text"
            value={user.email}
            onChange={(e)=>setUser({...user,email:e.target.value})}
            placeholder="email">
          </input>
            
            <label htmlFor="password">
               password
               </label>
            <input className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" id="password"
            type="password"
            value={user.password}
            onChange={(e)=>setUser({...user,password:e.target.value})}
            placeholder="password">
          </input>
            
           <button
            onClick={onLogin}
            className="p-2 border border-gray-300 mb-4 focus:outline-none focus:border-gray-600  rounded-full ">
            Login Here
 
           </button>
           <Link href="/signup"> Visit signup  here</Link>
            
        </div>
    )
}