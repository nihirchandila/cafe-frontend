import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { serverDomain } from '../credentials.js';
import axios from 'axios';

export default function Search() {
 const searchParam = new URLSearchParams(useLocation().search);
 const searchQuery = searchParam.get("query");
 let dataFilter = {}
if(searchQuery!=""){
  dataFilter = {
    search: searchQuery
  } 
}else{
  dataFilter = {search: ""}
}


 const [data, setData]= useState([])
  const getProducts = ()=>{
    axios({
      url: `${serverDomain}/product/search/`,
      method: "post",
      data: dataFilter
    }).then((res)=>{
      setData(res.data)
    }).catch((err)=>{
      setMessage("There is an error fetching data, plesse try again later")
    })
  }
  useEffect(()=>{
    getProducts()
  })

  const showProducts = ()=>{
    if(data.length>0){
      return(
        data.map((item, index)=>{
          return(
            <div className="col-lg-4 col-md-6 col-sm-6 product-card-wrap">
              <div className="product-card">
                <div className="image">
                  <img src="images/products-image_03.png" alt="product-image" />
                  <span className="sale-icon">15% OFF</span>
                </div>
                <div className="product-info">
                  <div className="product-name d-flex">
                    <div className="veg-status">
                      <img src="images/veg.png" alt="veg icon" />
                    </div>
                    <span>{item.name}</span>
                  </div>
                  <p>Pancake with fully added cheese and coverd with pizza</p>
                  <div className="product-bottom d-flex justify-content-between align-items-center">
                    <div className="sale">
                      <span className="line-through">{item.price}</span>
                      <span className="sale-amount">₹499</span>
                    </div>
                    <button className="btn btn-primary order-now">Order Now</button>
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
      <div className="sorting-section">
        <span>Sort By: </span>
        <select name="languages" id="lang" value="c#">
          <ption value="javascript">JavaScript</ption>
          <option value="php">PHP</option>
          <option value="java">Java</option>
          <option value="golang">Golang</option>
          <option value="python">Python</option>
          <option value="c#">C#</option>
          <option value="C++">C++</option>
          <option value="erlang">Erlang</option>
        </select>
      </div>
      <div className="products-wrap">
        <div className="row">
          <h4 className="mb-5">Showing result for : {searchQuery}</h4>
            {showProducts()}
        
        </div>
      </div>
</>
)
}