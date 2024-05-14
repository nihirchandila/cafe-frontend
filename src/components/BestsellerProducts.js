import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from "react-router-dom"

export default function BestsellerProducts() {
  const [data, setData]= useState([])

  const getProduct = ()=>{
  axios({
        url: "http://localhost:3001/bestseller/view/",
        method:"post",
        data: {
            
        } 
    }).then((res)=>{
        setData(res.data)
    }).catch((err)=>{
        console.log(err)
    })
  }
  useEffect(()=>{
    getProduct()
  },[])

  const showProducts = ()=>{
    if(data.length>0){
      const UpdatedData = data.slice(0,4)
      return(
        UpdatedData.map((item, index)=>{
          const url = `http://localhost:3001/images/uploads/products/${item.productId.featuredImage}`
          return(
            <div key={index} className="col-lg-3 col-md-4 col-sm-6 product-card-wrap">
              <div className="product-card">
                <div className="image">
                  <Link to={`/product/:${item.productId._id}`}>
                    <div class="image-wrap" style={{background: `url(${url})` }}></div>
                  </Link>
                  {item.productId.salePrice?(
                    <span className="sale-icon">{Math.round(((item.productId.salePrice)/item.productId.price)*100)+"%"}</span>
                  ): (<div></div>)}
                </div>
                <div className="product-info">
                  <div className="product-name d-flex">
                    <div className="veg-status">
                      {item.productId.veg==true?(
                         <img src="./assets/images/veg.png" alt="veg icon" />
                      ): ( <img src="./assets/images/non-veg.png" alt="veg icon" />)}
                    </div>
                    <Link to={`/product/:${item.productId._id}`}>
                      <span>{item.productId.name}</span>
                    </Link>
                  </div>
                  <p>{item.productId.about}</p>
                  <div className="product-bottom d-flex justify-content-between align-items-center">
                    <div className="sale">
                      {
                        item.productId.salePrice?(
                          <>
                          <span className="line-through">₹{item.productId.price}</span>
                          <span className="sale-amount">₹{item.productId.salePrice}</span>
                          </>
                          ): (
                            <span className="sale-amount">₹{item.productId.price}</span>
                          )
                      }
                    </div>
                    <Link to={`/product/:${item.productId._id}`}>
                      <button className="btn btn-primary order-now">View Item</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      )
    }else{
      return(<h3 className="text-center">No Data Found</h3>)
    }
  }

  return (
    <>
      <div className="home-products-archive">
      <div className="container">
        <div className="sec-heading m-auto mb-5 text-center col-md-7">
          <h2>Choose from our best selling categories</h2>
        </div>
      </div>
      <div className="products-wrap">
        <div className="container">
          <div className="row">

            {

            showProducts()

            }


          </div>
        </div>
      </div>
    </div>
    <div className="spacer"></div>
    </>
  )
}
