import React, { useEffect, useState } from "react";
export const SideBar = ({ todos, logouthandler }) => {
    const [History, setHistory] = useState([])
    const handleHistory = () => {
        let arr = []
        todos.map((todo, index) => {
            if (arr.length <= 5 && todo.status === "completed") {
                arr.push(todo)
            }
        })
        console.log(arr)
        setHistory(arr)
    }
    useEffect(() => {
        handleHistory()
    }, [todos])
    return (
        <div className="side-container">
            <div>
                <div style={{fontSize:"20px",fontStyle:"bold",fontFamily:"sans-serif",margin:"10px",marginLeft:"10px",marginTop:"20px"}}>To dO List</div>
                <div >
                    <div style={{fontSize:"20px",fontStyle:"bold",fontFamily:"sans-serif",margin:"10px",marginLeft:"10px",marginTop:"20px"}}>History</div>
                    <div>{
                        History && History.map((todo, index) => {
                            return (
                                <div key={index} className="row">
                                    <div style={{marginLeft:"10px"}}>{todo.activity}</div>
                                    <div style={{marginLeft:"10px"}}>{todo.timetaken}</div>
                                </div>
                            )
                        })
                    }</div>
                </div>
            </div>
            <div className="logout-container">
                <button type="button" onClick={(e) => logouthandler(e)}>logout</button>

            </div>


        </div>

    )
}