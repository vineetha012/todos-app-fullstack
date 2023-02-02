import React, { useContext, useState, useEffect } from "react";
//import './login.css'
import axios from 'axios'
import { RegLogcontext } from "./context";
import { Link, useNavigate } from 'react-router-dom'
export const LogIn = () => {
    const [loginData, setloginData] = useState({
        username: '',
        password: ''
    })

    const [errorMessage, setErrormesage] = useState({
        userErrorMessage: "",
        PasswordErrorMessage: ""
    })
    const [allvalidation, setAllValidation] = useState(false)
    const navigate = useNavigate()
    const {isauthentiacated,setisauthenticated}=useContext(RegLogcontext)

    // const { token, setToken, isauthentiacated, setisauthenticated } = useContext(RegLogcontext)
    const validationUserInputs = (e) => {
        var userRegex = /^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/
        var passwordRegex = /^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!&$%&@? "]).*$/

        if (loginData.username === "" || loginData.password === "") {
            setAllValidation(false)
        }
        if (userRegex.test(loginData.username)) {
            setErrormesage((val) => ({ ...val, userErrorMessage: "" }))
        }
        else {
            setErrormesage((val) => ({ ...val, userErrorMessage: "user name should contain only alphabets" }))
        }
        if (passwordRegex.test(loginData.password)) {
            setErrormesage((val) => ({ ...val, PasswordErrorMessage: "" }))
        }
        else {
            setErrormesage((val) => ({ ...val, PasswordErrorMessage: "Password should contain atlease 6 characters" }))
        }
    }
    const HandleuserInput = (e) => {
        setloginData({ ...loginData, [e.target.name]: e.target.value })
        validationUserInputs(e)
    }
    console.log(loginData);
    const LoginHandler = async (e) => {
        e.preventDefault()
        if (errorMessage.username == "" && errorMessage.PasswordErrorMessage == "") {
            setAllValidation(true)
        }
        let url='http://localhost:5000/v1/signIn'

        await axios.post(url, loginData).then(
            (res) => {
                if (res.data.status == 'Success') {
                    console.log(res.data.token)
                    localStorage.setItem('token', res.data.token)
                    //setToken(res.data.token)
                    navigate('/home')
                }
            }
        ).catch((error) => {
            console.log(error.response.data)
            alert(error.response.data)
        })

    }
    // useEffect(()=>{
    //     if (token) {
    //         localStorage.setItem("token",token)
    //         navigate('/Home')
    //         setisauthenticated(!isauthentiacated)
    //     }
    // },[token])

    //console.log(token)

    return (
        <div className="login-reg">
            <div className="login-reg-container">
                <div className="center">
                    <form onSubmit={(e) => LoginHandler(e)}>
                        <div style={{ textAlign: "center", color: "white", fontFamily: "sans-serif", marginBottom: "20px", fontSize: "30px" }}>Log In</div>
                        <input type="text" name="username" placeholder="Username" onChange={(e) => HandleuserInput(e)} /><br />
                        <div>{errorMessage.userErrorMessage}</div>
                        <input type="text" name="password" placeholder="Password" onChange={(e) => HandleuserInput(e)} /><br />
                        <div>{errorMessage.PasswordErrorMessage}</div>
                        <div style={{ display: "flex" }}>
                            <button style={{ width: "100px", margin: "auto" }} type="submit">LogIn</button>
                        </div>
                    </form>
                    <div style={{ display: "flex" }}>
                        <Link style={{ margin: "auto" }} to="/register"><button style={{ width: "100px" }}>Register</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}