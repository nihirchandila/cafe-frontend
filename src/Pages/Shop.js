import React, { useEffect } from 'react';
import Header from "../components/Header.js"
import Footer from "../components/Footer.js"
import Sidebar from '../components/Sidebar.js';
import { Outlet } from 'react-router-dom';


export default function Shop(props) {
  const getItemStatus = (getData)=>{
    props.itemStatusToParent(getData)
  }

  return (
    <>
    <Header/>
    <div className="shop-archive-page mt-4">
        <div className="container">
            <div className="row">
                {/* sidebar */}
                <Sidebar itemStatus = {getItemStatus} />
                <div className="col-lg-10 col-md-9 order-sm-1 order-1 order-md-2">
                  <div className="shop-products-archive">
                    <div className="shop-page-intro">
                      <div className="intro-wrapper">
                        <img src="/assets/images/delivery-person.png" alt="deivery-guy" /> 
                        <h3>We deliver the tase to you on your doorstep and belive
                          in providing best services</h3>
                      </div>
                    </div>
                      {<Outlet/>}
                      {/* products-archive */}
                  </div>
                </div>
             
            </div>
        </div>
    </div>
    <Footer/>
    </>
  )
}
