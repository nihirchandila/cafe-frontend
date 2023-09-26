import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("")
  const [message, setMessage]= useState("")

  const submit = (e)=>{
    e.preventDefault()
    axios({
      url: "http://localhost:3001/user/login/",
      method: "post",
      data: {
        email: email,
        password:password
      }
    }).then((res)=>{
      if(res.data.status===200){
        const token = res.data.token
        const userName = res.data.name
        Cookies.set("userToken", token, {expires: 60*60*24})
        Cookies.set("userName", userName, {expires: 60*60*24})
        navigate("/")
      }else if(res.data.status==400){
        setMessage(res.data.message)
      }
    }).catch((err)=>{
      setMessage("There is an error, please try again later.")
    })
  }

  return (
    <>
      {/* <link rel="stylesheet" href="/assets/css/loginSignup.css" /> */}
      <div className="login-page">
        <div className="form">
          <div className="logo">
          <Link to="/home"><img src="./assets/images/logo_black.png" alt="logo" /></Link>
          </div>
          {message!=""?(<div className="res-message">{message}</div>):(<div></div>)}

          <h3 className="log-heading">Login Here</h3>
          <form className="login-form">
            <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" />
            <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="password" />
            <button onClick={submit}>login</button>
            <p className="message">
              Not registered? <Link to="/register">Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
