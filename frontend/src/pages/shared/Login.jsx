import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/useAuth'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const { loginUser,user,token } =useAuth();
    const [userName,SetUserName] = useState("");
    const [password,SetPassword] = useState("");
    const navigate = useNavigate();
    
    useEffect(()=>{
      if(user && token){
        navigate("/home");    
      }
    },[])

  return (
    <div className='w-full h-full flex justify-center items-center'>
        <div className='w-[20rem] h-fit p-14 bg-slate-100 rounded-md shadow-lg'>
        <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="userName"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your User Name
                </label>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  onChange={(e)=>SetUserName(e.target.value)}
                  value={userName}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="User Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  onChange={(e)=>SetPassword(e.target.value)}
                  value={password}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={(e)=>{
                  e.preventDefault();
                  loginUser(userName,password);
                }}
              >
                Sign in
              </button>
            </form>

        </div>
    </div>
  )
}

export default Login