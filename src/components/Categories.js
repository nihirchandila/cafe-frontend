import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { serverDomain, categoriesPath } from '../credentials.js';

export default function Categories() {
  const [data, setData]= useState([]);
  const [message, setMessage] = useState("")

  const getCategories = ()=>{
    axios({
      url: `${serverDomain}/category/view/`,
      method: "post",
      data: {

      }
    }).then((res)=>{
      setData(res.data)
    }).catch((err)=>{
      setMessage("There is an error fetching data, plesse try again later")
    })
  }

  useEffect(()=>{
    getCategories()
  },[])

  const showCategories = ()=>{
    return(
    data.map((item, index)=>{
      return(
        <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-6 categories-card">
          <img src={categoriesPath+"/"+item.image} alt={item.name}/>
        </div>
      )
    })
    )
  }

  return (
    <>
    <div className="categories-section">
      <div className="container">
        <div className="sec-heading m-auto mb-5 text-center col-md-7">
          <h2>Choose from our best selling categories</h2>
        </div>
        <div className="row">
            {/* render categories */}
            {showCategories()}
        </div>
      </div>
    </div>
    </>
  )
}
