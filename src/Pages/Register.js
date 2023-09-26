import React, {useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const[name, setName]= useState("")
    const[password, setPassword]= useState("")
    const[email, setEmail]= useState("");
    const [message, setMessage]= useState("")

    const submit = (e)=>{
        e.preventDefault();
        axios({
            url:"http://localhost:3001/user/register/",
            method:"post",
            data: {
                name: name,
                password: password,
                email: email
            }
        }).then((res)=>{
            if(res.data.status==400){
              setMessage(res.data.message)
            }else if(res.data.status==200){
              navigate("/login")
            }
        }).catch((err)=>{
            setMessage("There is an error please try again later")
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
          <h3 className="log-heading">Sign Up</h3>
          <form className="register-form">
            <input type="text" onChange={(e)=>{setName(e.target.value)}} placeholder="name" />
            <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="password" />
            <input type="text" onChange={(e)=>{setEmail(e.target.value)}} placeholder="email address" />
            <button onClick={submit}>Submit</button>
            <p className="message">
              Already registered? <Link to="/login">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
