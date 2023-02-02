import axios from "axios";

const URL = 'http://localhost:5000';
export const registerUser = async (user) => {
    // const res = await fetch(`${URL}/v1/register`, {
    //     method: "POST",
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(user)
    // })
    let res=await axios.post(`${URL}/v1/register`,user)   
    return res
}

export const createTodourl = async (newTodo) => {
    console.log( localStorage.getItem('token') )
    const res = await fetch(`${URL}/v1/createTodo`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token') 
        },
        body: JSON.stringify(newTodo)
    })
    return res.json();
}
export const getTodoList = async () => {
    const res = await fetch(`${URL}/v1/home`, {
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    })
    return res.json();
}
export const handleStartTaskapi=async (id,updatedval) => {
    console.log(updatedval)
    const res = await fetch(`${URL}/v1/home/${id}/${updatedval}`, {
        method: 'PUT',
        headers: {
            'Authorization': localStorage.getItem('token')
        }
     //   body: JSON.stringify(updatedval)
    })
    return res.json();
}
export const handleEndTaskapi=async (id,status,time) => {
   // console.log(updatedval)
    const res = await fetch(`${URL}/v1/home/time/${id}/${status}/${time}`, {
        method: 'PUT',
        headers: {
            'Authorization': localStorage.getItem('token')
        }
        //body: JSON.stringify(updatedval)
    })
    return res.json();
}
