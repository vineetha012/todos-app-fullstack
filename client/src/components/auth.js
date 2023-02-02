import React, { useContext, useEffect } from "react"
import { RegLogcontext } from "./context"
import { Home } from "./home"
import { useNavigate } from "react-router-dom"
import { CreateTodo } from "./createtodo"
export const HomeAuthentication=()=>{
    const {isauthentiacated,setisauthenticated}=useContext(RegLogcontext)
    console.log(isauthentiacated)
    const navigate=useNavigate()

    const notokenfunction=(isauthentiacated)=>{
        if(!localStorage.getItem('token')){
            navigate('/')
            console.log(localStorage.getItem('token'))
        }
    }
    useEffect(()=>{
        if(localStorage.getItem('token')){
            setisauthenticated(true)
            console.log(localStorage.getItem('token'))
        }
        notokenfunction(isauthentiacated)
    },[])
    return(
        <>
            {isauthentiacated?<Home/>:notokenfunction(isauthentiacated)}
            
        </>
    )
}
export const CreateTodoAuthentication=()=>{
    const {isauthentiacated,setisauthenticated}=useContext(RegLogcontext)
    console.log(isauthentiacated)
    const navigate=useNavigate()

    const notokenfunction=(isauthentiacated)=>{
        if(!localStorage.getItem('token')){
            navigate('/')
            console.log(localStorage.getItem('token'))
        }
    }
    useEffect(()=>{
        if(localStorage.getItem('token')){
            setisauthenticated(true)
            console.log(localStorage.getItem('token'))
        }
        notokenfunction(isauthentiacated)
    },[])
    return(
        <>
            {isauthentiacated?<CreateTodo/>:notokenfunction(isauthentiacated)}           
        </>
    )
}