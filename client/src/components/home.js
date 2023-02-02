import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTodoList } from "./apiUtils";
import { RegLogcontext } from "./context";
import { Nav } from "./nav";
import { SideBar } from "./sidebar";
import { TodosTable } from "./todostable";
import './home.css'
export const Home = () => {
    const [todos, setTodos] = useState([])
    const [username, setUsername] = useState("")

    const navigate = useNavigate()
    const { isauthentiacated, setisauthenticated } = useContext(RegLogcontext)
    const logouthandler = (e) => {
        setisauthenticated(false)
        navigate('/')
        localStorage.clear()
    }
    useEffect(() => {
        getTodoList().then((res) => {
            console.log(res.username)
            setUsername(res.username)
            setTodos(res.data)
        })
    }, [])
    console.log(todos)
    return (
        <div className="home">
            <div className="Nav-cont">
                <Nav username={username} />
            </div>
            <div className="bottom-cont">
                <SideBar todos={todos} logouthandler={logouthandler}/>
                <TodosTable todos={todos} setTodos={setTodos} />
            </div>
            {/* home
        <button onClick={()=>navigate('createtodo')}>create todo</button>
        <button type="button" onClick={(e)=>logouthandler(e)}>logout</button> */}
        </div>
    )
}