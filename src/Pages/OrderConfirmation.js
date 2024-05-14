import React from 'react'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import OrderConfirm from '../components/OrderConfirm.js'


export default function OrderConfirmation() {
  return (
    <>
      <Header/>
        <OrderConfirm/>
      <Footer/>
    </>
  )
}
