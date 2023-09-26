import React, { useEffect } from 'react';
import ProductSingle from '../components/ProductSingle.js';
import { useParams,useNavigate } from 'react-router-dom';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

export default function Single() {
    const navigate = useNavigate()
    const {id} = useParams();
    const productId = id.replace(":","")

    if(productId){
        return (
            <>
                <Header/>
                    <ProductSingle id={productId}/>
                <Footer/>   
            </>
          )
    }else{    
        useEffect(()=>{
            navigate("/shop")
        },[])
    }
  
}
