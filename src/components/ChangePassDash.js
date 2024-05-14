import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function ChangePassDash() {
    const Navigate = useNavigate()
  const[pass,setPass] = useState("")
  const[confirmPass,setConfirmPass] = useState("")

  const handleUpdate = (e)=>{
    e.preventDefault();
    
    if(pass==""){
        alert('Password Field is blank')
    }
    else if(confirmPass==""){
        alert('Confirm Password Field is blank')
    }
    else if( pass !== confirmPass){
        alert('Password does not match')
        return;
    }
    else{
        axios({
            url: "http://localhost:3001/user/change-pass/",
            method:"post",
            data : {
                    filter: {
                      id: Cookies.get("userId")
                    },data: {
                      password: confirmPass
                    }
                  
            }
        }).then(()=>{
            Navigate("/dashboard/profile")
            alert("Password Updated Succesfully")
        })
    }
  }
  
  return (
    <>
        <h3 className="mb-4">Change Password</h3>
          <div className="profile">
            <div className="row">
              <div className="col-md-12">
                <div className="d-flex">
                  <span>Name Password: </span>
                  <input type="password"className="pass mb-3" onChange={(e)=>{setPass(e.target.value)}}></input>
                </div>
                <div className="d-flex">
                  <span>Confirm Password: </span>
                  <input type="password"className="pass mb-3" onChange={(e)=>{setConfirmPass(e.target.value)}}></input>
                </div>
                <button style={{width: "auto", color: "#fff"}} className="button" onClick={handleUpdate}>Update</button>

              </div>
              
            </div>
          </div>
    </>
  );
}
