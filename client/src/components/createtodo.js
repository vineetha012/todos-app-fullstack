import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { createTodourl } from "./apiUtils";
export const CreateTodo = () => {
    const [newTodo, setNewTodo] = useState({
        activity: ""
    })
    const navigate = useNavigate()
    const createTodohandler = async (e) => {
        e.preventDefault()
        console.log(newTodo)
        if(newTodo.activity==""){
            alert("give a todo")
        }
        else{           
            createTodourl(newTodo)
        }
        navigate('/home')
    }
    const changeinpuut = (e) => {
        setNewTodo({ [e.target.name]: e.target.value })
    }
    useEffect(()=>{

    },[newTodo])
    console.log(newTodo)
    return (
        <div className="createTodo">
            <form onSubmit={(e) => createTodohandler(e)} className="createform">
                <label>new activity</label>
                <input name="activity" type="text" placeholder="Enter a new Todo" onChange={(e) => changeinpuut(e)} />
                <button type="submit" style={{margin:"5px"}}>create</button>
            </form>
        </div>
    )
}