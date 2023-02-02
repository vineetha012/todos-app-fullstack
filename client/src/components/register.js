import React, { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from 'axios'
import './login.css'
import { registerUser } from "./apiUtils";
export const Register=()=>{
    const [registerData,setRegisterData]=useState({
        username:'',
        password:'',
        confirmPassword:''
    })
    const [errorMessage,setErrormesage]=useState({
        userErrorMessage: "",
        PasswordErrorMessage:"",
        confirmPasswordErrorMessage:""
    })
    const [allvalidation, setAllValidation] = useState(false)
    const navigate = useNavigate();
    const validationUserInputs = (e) => {
        //var emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/
        var userRegex= /^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/
        var passwordRegex=/^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!&$%&@? "]).*$/
        
        if (registerData.email === "" || registerData.password === ""||registerData.confirmPassword=="") {
            setAllValidation(false)
        }
        //---------
        if (userRegex.test(registerData.email)) {
            setErrormesage((val) => ({ ...val, userErrorMessage: "" }))
        }
        else {
            setErrormesage((val) => ({ ...val, userErrorMessage: "Email shoud contain@ and .com" }))
        }
        //--------
       
        if(passwordRegex.test(registerData.password)){
            setErrormesage((val) => ({ ...val, PasswordErrorMessage: "" }))
        }
        else{
            setErrormesage((val) => ({ ...val, PasswordErrorMessage: "Password should contain atlease 6 characters" }))
        }
        //------
        if(registerData.password===registerData.confirmPassword){
            setErrormesage((val) => ({ ...val, confirmPasswordErrorMessage: "" }))

        }
        else{
            setErrormesage((val) => ({ ...val, confirmPasswordErrorMessage:"password and confirm password should be same"}))

        }
    }

    const HandleuserInput=(e)=>{
        setRegisterData({...registerData,[e.target.name]:e.target.value})
        validationUserInputs(e)
    }
    console.log(registerData);
    const RegisterHandler=async(e)=>{
        e.preventDefault()
        if (errorMessage.email == "" && errorMessage.PasswordErrorMessage == "" && errorMessage.confirmPasswordErrorMessage == "") {
            setAllValidation(true)
        }
        registerUser(registerData).then(res=>{
            alert(res.data.message)
            navigate('/');
        }).catch((err)=>alert(err.response.data.message))
    }
    return(
        <div  className="login-reg">
            <div className="login-reg-container">
                <div className="center">
                <form onSubmit={(e)=>RegisterHandler(e)}>
                    <div style={{textAlign:"center",color:"white" ,fontFamily:"sans-serif",marginBottom:"20px" ,fontSize:"30px"}}>Register</div>
                    <input type="text" name="username" placeholder="Username" onChange={(e)=>HandleuserInput(e)}/><br/>
                    <div>{errorMessage.userErrorMessage}</div>
                    <input type="text" name="password" placeholder="Password" onChange={(e)=>HandleuserInput(e)}/><br/>
                    <div>{errorMessage.PasswordErrorMessage}</div>
                    <input type="text" name="confirmPassword" placeholder="Confirm Password" onChange={(e)=>HandleuserInput(e)}/><br/>
                    <div>{errorMessage.confirmPasswordErrorMessage}</div>
                    <button type="submit">Register</button>
                </form>
                <Link to="/"><button>LogIn</button></Link>
                </div>
                
            </div>
        </div>
    )
}