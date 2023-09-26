import React, { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'



export default function Header() {
  const [authentication, setAuthentication] = useState(false);
  const [cartCount, setCartCount] = useState(0)
  
  useEffect(()=>{
    const localData = localStorage.getItem("cartItem");
    if(localData){
      const parsedData = JSON.parse(localData);
      setCartCount(parsedData.length)
    }
  }) 

  const toggleMenu = ()=>{
    document.getElementById("nav-menu-mobile").classList.toggle("menu-display")
    document.getElementById("top-toggle-bt").classList.toggle("top-toggle-button-toggled")
    document.getElementById("bottom-toggle-bt").classList.toggle("bottom-toggle-button-toggled")
    document.getElementById("middle-toggle-bt").classList.toggle("middle-toggle-button-toggled")
  }
  const auth = ()=>{
    axios({
      url: "http://localhost:3001/user/user-auth/",
      method:"post",
      data: {
        token: Cookies.get("userToken")
      }
    }).then((res)=>{
      if(res.data.status==200){
        setAuthentication(true)
      }else if(res.data.status==400){
        setAuthentication(false)
      }else{
        setAuthentication(false)
      }
    }).catch((err)=>{
      if(err){
        setAuthentication(false)
      }
    })
  }

  useEffect(()=>{
    auth()
  },[])

  return (
    <>
    <header>
      <div className="container">
        <nav className="desktop-nav">
          <div className="menu-overlay">
            <div className="toggle-button" onClick={toggleMenu} id="toggle-button">
              <div className="top-toggle-bt" id="top-toggle-bt"></div>
              <div className="middle-toggle-bt" id="middle-toggle-bt"></div>
              <div className="bottom-toggle-bt" id="bottom-toggle-bt"></div>
            </div>

            <div className="nav-menu-mobile" id="nav-menu-mobile">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
                <li>
                <Link to="/">Homee</Link>
                </li>
                <li>
                  <a href="">Account</a>
                </li>
             
              </ul>
            </div>

          </div>
          <div className="logo">
            <img src={process.env.PUBLIC_URL+"/assets/images/logo_black.png"} alt="logo"/>
          </div>
          <div className="nav-menu-desktop">
            <ul>
            <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/shop" onClick={()=>{    window.location.href = '/shop';}}>Shop</Link>
                </li>
                {authentication==true?(
                  <div className="dropdown">
                  <li className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Account
                  </li>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <div className="welcome-msg">Welcome! {Cookies.get("userName")}</div>
                    <a className="dropdown-item" href="#">Dashboard</a>
                    <a className="dropdown-item" href="#">Orders</a>
                    <a className="dropdown-item logout-btn" href="#">Logout</a>

                  </div>
                </div>
                ):(
                <li>
                  <a href="/login">Login</a>
                </li>
                )}
                <li>
                  <Link to="/cart" className="cart"><img width="48" height="48" src="https://img.icons8.com/fluency-systems-regular/48/shopping-cart.png" alt="shopping-cart"/> <span>{cartCount}</span></Link>
                </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
    </>
  )
}
