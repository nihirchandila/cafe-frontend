import React, { useState, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { serverDomain } from '../credentials.js';
import axios from 'axios';
import ProductsArchive from './ProductsArchive.js';


export default function Sidebar(props) {
  const [search, setSearch] = useState("")
  const [categories, setCategories]= useState([])
  const [vegCheck, setVegCheck] = useState([]);

  const getCategories = ()=>{
    axios({
      url: `${serverDomain}/category/view/`,
      method: "post",
      data: {

      }
    }).then((res)=>{
      setCategories(res.data)
    }).catch((err)=>{
      // setMessage("There is an error fetching data, plesse try again later")
    })
  }
  useEffect(()=>{
    getCategories()
  },[])

  const vegStatus = (e)=>{
    if(e.target.value=="veg"){
      setVegCheck({veg: true})
    }else if(e.target.value=="non-veg"){
      setVegCheck({veg: false})
    }
  }
  useEffect(()=>{
      props.itemStatus([vegCheck])
  },[vegCheck])

  const handleReloadAndRedirect = () => {
    window.location.href = '/shop';
  };

  return (
    <>
      <div className="col-lg-2 col-md-3 col-sm-6 col-6 order-sm-2 order-2 order-md-1">
                    <div className="sidebar-shop">
                        <div className="search-section">
                            <div className="input-group">
                                <input type="search" onChange={(e)=>{setSearch(e.target.value)}} className="search-form" placeholder="Search"/>
                                <Link to={`/shop/search?query=${search}`} type="button" className="btn btn-primary button button">Search</Link>
                            </div>
                        </div>
                        <div className="widget-wrapper menu-widget">
                            <h4>Select From Menu</h4>
                            <Link to="/shop" onClick={handleReloadAndRedirect}> <span>All</span></Link>
                            {categories.map((data, index)=>{
                              return( 
                                <Link key={index} to={`/shop/category/:${data._id}`}><span>{data.name}</span></Link>
                              )
                            })}
                            
                        </div>
                        <div className="widget-wrapper veg-category">
                            <h4>Choose Food Type</h4>
                            <div className="checkbox-wrap">
                              <div className="veg-checkbox form-check">
                                <input className="form-check-input" onChange={vegStatus} type="radio" name="flexRadioDefault" value="veg" id="flexRadioDefault1" checked={vegCheck.veg==true}/>
                                <label className="form-check-label" htmlFor="veg"vvvv>
                                    Veg
                                </label>
                              </div>
                              <div className="non-veg-checkbox form-check">
                                <input className="form-check-input" onChange={vegStatus} type="radio" name="flexRadioDefault" value="non-veg" id="flexRadioDefault2" checked={vegCheck.veg==false}/>
                                <label className="form-check-label"  htmlFor="non-veg">
                                  Non Veg
                                </label>
                              </div>
                            </div>
                        </div>

                        {/* <div className="widget-wrapper veg-category">
                            <h4>Sale And Offers</h4>
                            <div className="offers-checkbox-wrap">
                              <div className="offer-checkbox">
                                <input className="form-check-input" type="checkbox" id="20Off" />
                                <label className="form-check-label" htmlFor="20Off">
                                    20% Off
                                </label>
                              </div>
                              <div className="offer-checkbox">
                                <input className="form-check-input" type="checkbox" id="50off"/>
                                <label className="form-check-label" htmlFor="50off">
                                  50% Off
                                </label>
                              </div>
                            </div>
                        </div>
                        <div className="widget-wrapper bestseller">
                            <h4>Our Bestseller</h4>
                            <a href=""><span>Burger</span></a>
                            <a href=""><span>Pizza</span></a>
                            <a href=""><span>Noodles</span></a>
                            <a href=""><span>Deserts</span></a>
                            <a href=""><span>Pasta</span></a>
                        </div> */}
                    </div>
                </div>
    </>
  )
}
