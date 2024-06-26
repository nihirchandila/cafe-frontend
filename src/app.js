import React, { useEffect, useState } from "react";
import Home from "./Pages/Home.js";
import Contact from "./Pages/Contact.js"
import NotFound from "./Pages/NotFound.js";
import Login from "./Pages/Login.js";
import Register from "./Pages/Register.js";
import Dashboard from "./components/Dashboard.js";
import Shop from "./Pages/Shop.js";
import ProductsArchive from "./components/ProductsArchive.js";
import Search from "./components/Search.js";
import Single from "./Pages/Single.js";
import Checkout from "./Pages/Checkout.js";

import "./Style.css";
import { BrowserRouter, Route, Routes, useSearchParams } from "react-router-dom";
import Cart from "./Pages/Cart.js";
import { CartContextProvider } from "./context/CartContext.js";
import OrderConfirmation from "./Pages/OrderConfirmation.js";
import ProfileDash from "./components/ProfileDash.js";
import AddressDash from "./components/AddressDash.js";
import OrdersDash from "./components/OrdersDash..js";
import ChangePassDash from "./components/ChangePassDash.js";

export default function app() {
  const [itemStatusData, setItemStatusData] = useState()
  const getitemStatusFunc = (getData)=>{
    setItemStatusData(getData);
  }

  
 

  return (
    <>
    <link type="text/css" rel="stylesheet" href={process.env.PUBLIC_URL +'/assets/css/style.css'}/>
    <link type="text/css" rel="stylesheet" href={process.env.PUBLIC_URL +'/assets/css/responsive.css'}/>
    <CartContextProvider>
      <BrowserRouter>
      <Routes>
            <Route exact  element={<Home/>} path="/"/>
            <Route element={<Home/>} path="/home"/>
            <Route element={<Contact/>} path="/contact"/>
            <Route element={<Login/>} path="/login"/>
            <Route element={<Register/>} path="/register"/>
            <Route element={<Single/>} path="/product/:id"/>
            <Route element={<Cart/>} path="/cart"/>
            <Route element={<Checkout/>} path="/checkout"/>
            <Route element={<OrderConfirmation/>} path="/confirm"/>
            <Route element={<Shop itemStatusToParent={getitemStatusFunc}/>} path="/shop">
              <Route element={<Search/>} path="/shop/search"/>
              <Route element={<ProductsArchive itemStatus={itemStatusData}/>} path="/shop/" />
              <Route element={<ProductsArchive itemStatus={itemStatusData} />} path={`/shop/category/:name`} />
            </Route>
            <Route element={<Dashboard/>} path="/dashboard">
              <Route element={<ProfileDash/>} path="/dashboard/profile"/>
              <Route element={<AddressDash/>} path="/dashboard/address"/>
              <Route element={<OrdersDash/>} path="/dashboard/order"/>
              <Route element={<ChangePassDash/>} path="/dashboard/change-password"/>
            </Route>
            <Route path="*" element={<NotFound/>}/> 
           
      </Routes>
      </BrowserRouter>
      </CartContextProvider>
    </>
  );
}
