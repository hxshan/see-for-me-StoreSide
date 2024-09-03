import { createContext, useEffect, useState } from "react";
import { loginAPI, RegisterAPI } from "../services/authService";
import React from "react";
import axios from "../api/axios";

const userContext = createContext();

export const UserProvider = ({children}) =>{

    const [user,SetUser] = useState(null);
    const [token,SetToken] = useState(null);
    const [isReady,SetIsReady] = useState(false);

    useEffect(()=>{
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if(user && token){
            SetToken(token);
            SetUser(JSON.parse(user));
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        }
        SetIsReady(true);
    },[])

    const register = async (userName,email,password) => {

        await RegisterAPI(userName,email,password).then((res) =>{
            if(res){
                localStorage.setItem("token",res?.data.token);
                const userObj ={
                    UserName: res?.data?.UserName,
                    Email: res?.data?.Email
                };
                localStorage.setItem("user",JSON.stringify(userObj));
                SetToken(token)
                SetUser(userObj);

            }
        }).catch((e)=>{
            console.log("error "+ e)
        })

    }
    
    const loginUser = async (userName,password) => {

        await loginAPI(userName,password).then((res) =>{
            if(res){
                localStorage.setItem("token",res?.data.token);
                const userObj ={
                    UserName: res?.data?.UserName,
                    Email: res?.data?.Email
                };
                localStorage.setItem("user",JSON.stringify(userObj));
                SetToken(token)
                SetUser(userObj);

            }
        }).catch((e)=>{
            console.log("error "+ e)
        })

    }

    const logout =() =>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        SetUser(null);
        SetToken(null);

    }


    return(
        <userContext.Provider value={{loginUser,register,logout,user,token}}>
            {isReady ? children : null}
        </userContext.Provider>
    )
};

export const useAuth = () => React.useContext(userContext);