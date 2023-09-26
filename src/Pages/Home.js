import React from 'react';
import HomePageSection from "../components/HomePageSection.js"
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function Home() {
  return (
    <>
        <Header/>
        <HomePageSection/>
        <Footer/>

    </>
  )
}
