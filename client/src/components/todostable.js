import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { handleEndTaskapi, handleStartTaskapi } from "./apiUtils";
export const TodosTable = ({ todos, setTodos }) => {
    const navigate = useNavigate()
    const [isTaskOngoing, setIsTaskOngoing] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [pauseTime, setPauseTime] = useState(null);
    const [resumeTime, setResumeTime] = useState(null);
    const [TotalTime, setTotalTime] = useState("")
    const [updatedval, setUpdatedVal] = useState({})
    const changeTodos=(resid,status)=>{
         let arr=[...todos]
            arr.map((todo,index)=>{
                if(todo._id===resid){
                    arr[index].status=status
                }
            })
           //setNewTodo({ [e.target.name]: e.target.value })
    }
   const changeendTodos=(resid,status,timestr)=>{
    let arr=[...todos]
    arr.map((todo,index)=>{
        if(todo._id===resid){
            arr[index].status=status
            arr[index].timetaken=timestr
        }
    })
   }
    const handleStartTask = async (e) => {
        todos.map((todo,index)=>{
            if(todo.status=="ongoing"){
                setIsTaskOngoing(true)
            }
        })
        if (!isTaskOngoing) {
            setIsTaskOngoing(true);
            setStartTime(new Date().getTime());
            let resid = e.target.name
            let status="ongoing"
            console.log("id", resid)
           
            setUpdatedVal({
                id:resid
            })
            
            handleStartTaskapi(resid,status)
            changeTodos(resid,status)
        } else {
            alert("Please finish or pause the ongoing task first");
        }
    };

    const handlePauseTask = (e) => {
        setPauseTime(new Date().getTime());
        let resid = e.target.name
        let status="continue"
        changeTodos(resid,status)
        handleStartTaskapi(resid,status)
    };

    const handleResumeTask = (e) => {
        setResumeTime(new Date().getTime());
        let resid = e.target.name
        let status="ongoing"
        changeTodos(resid,status)
        handleStartTaskapi(resid,status)
    };
    const handleEndTask = (e) => {
        setIsTaskOngoing(false);
        setEndTime(new Date().getTime());
        console.log("endTime - startTime", endTime, startTime)
        let totalTime = endTime - startTime;
        if (pauseTime && resumeTime) {
            totalTime -= (resumeTime - pauseTime);
        }
        totalTime = -1 * totalTime
        let timestr = timeCalculate(totalTime)
        setTotalTime(timestr)
        let resid = e.target.name
        let status="completed"
        changeendTodos(resid,status,timestr)
        handleEndTaskapi(resid,status,timestr)
    };
    useEffect(()=>{

    },[todos])
    console.log("totaltime", TotalTime)
    return (
        <div className="todo-container">
            <div className="create-cont">
                <button onClick={() => navigate('/createtodo')} className="create-button">create todo</button>
            </div>
            <div className="table-cont">
                <table>
                    <thead>
                        <tr>
                            <td>Activity</td>
                            <td>Status</td>
                            <td>Time taken (Hrs:Min:Sec)</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos && todos.map((todo, index) => {
                                //console.log(todo)
                                return (
                                    <tr key={index} id={todo._id}>
                                        <td>{todo.activity}</td>
                                        <td>{todo.status}</td>
                                        <td>{todo.timetaken}</td>
                                        <td>{
                                            todo.status === "pending" ? <button name={todo._id} onClick={(e) => handleStartTask(e)}>start</button> : ""

                                        }
                                            {
                                                todo.status === "continue" ? <button name={todo._id} onClick={(e) => handleResumeTask(e)}>resume</button> : ""
                                            }
                                            {
                                                todo.status === "ongoing" ?
                                                    <div>
                                                        <button name={todo._id} onClick={(e) => handlePauseTask(e)} >pause</button>
                                                        <button name={todo._id} onClick={(e) => handleEndTask(e)}>end</button>
                                                    </div> : ""
                                            }

                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}
function timeCalculate(totalTime) {
    totalTime = totalTime / 1000;
   // let milliseconds = parseInt((totalTime % 1000) / 10)
   let seconds = Math.floor(totalTime % 60);
    let minutes = Math.floor((totalTime % 60)/10);
    let minutesAsString = minutes < 10 ? "0" + minutes : minutes;
    let secondsAsString = seconds < 10 ? "0" + seconds : seconds;

   // milliseconds = milliseconds < 10 ? '0' + milliseconds : milliseconds;
    //console.log(` ${seconds}:: ${milliseconds}`)
    console.log(Math.floor(totalTime % 60))
    return (` ${minutesAsString}::${secondsAsString}sec`)
}
