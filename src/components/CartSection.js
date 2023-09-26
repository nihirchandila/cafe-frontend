import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { serverDomain } from '../credentials';
import { Link } from 'react-router-dom';

export default function CartSection() {
    const [productData, setProductsData] = useState([]);
    const [localData, setLocalData] = useState([]);
    const [totalPrice, setTotalPrice]=useState(0)
    const [delivery, setDelivery]=useState(80)
    const [discount, setDiscount] = useState(false)
    const [discountCode, setDiscountCode] = useState(0)
    const [disPercentage, setDisPercentage] = useState(0)
    const [discountAmount, setDisAmount] = useState(0)
    const [couponMessage, setCouponMessage] = useState({message: "", status: ""})
    const [subTotal, setSubTotal] = useState(0)

    const getproductData = ()=>{
        const localStorageData = localStorage.getItem("cartItem");
        const parsedData = JSON.parse(localStorageData);
        setLocalData(parsedData)
        const productIds = [];
        let totalAmount = 0
        parsedData.map((item)=>{
            productIds.push(item.productId);
            totalAmount+=item.totalPrice
        });
        setTotalPrice(totalAmount)
        setSubTotal(totalAmount+delivery-discountAmount)
        // console.log(productIds)
        axios({
            url: "http://localhost:3001/product/cartItem/",
            method: "post",
            data: productIds
        }).then((res)=>{
            setProductsData(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        getproductData()
    },[])

    const remove = (index)=>{
        const localData = localStorage.getItem("cartItem");
        const parsedData = JSON.parse(localData);
        parsedData.splice(index, 1);
        localStorage.setItem("cartItem", JSON.stringify(parsedData));
        setLocalData(parsedData);
        getproductData();
    }
    const applyCoupon = ()=>{
        if(discountCode){
            axios({
                url: "http://localhost:3001/coupon/view",
                method: "post",
                data: {name: discountCode}
            }).then((res)=>{
                if(res.data.length>0){
                    setDisPercentage(res.data[0].off)
                    setCouponMessage({message: res.data[0].off+"% OFF Coupon Applied", status: "valid"})
                    setDiscount(true)
                    setDisAmount(res.data[0].off/100*totalPrice)
                    setSubTotal(totalPrice+delivery-res.data[0].off/100*totalPrice)//why have to write like this and not only the state name
                }else{
                    setDisAmount(0)
                    setCouponMessage({message:"Invalid Coupon", status: "invalid"})
                    setDiscount(false)
                    setSubTotal(totalPrice+delivery-0)
                }
            }).catch((err)=>{
                console.log(err)
            })
        }else{
            setDisAmount(0)
            setCouponMessage({message:"Invalid Coupon", status: "invalid"})
            setDiscount(false)
            setSubTotal(totalPrice+delivery-0)
        }
    }

  return (
    <>
    <div className="cart-page">
        <div className="container">
            <div className="breadcrumbs">
                <Link to="/home"><span className="inactive-bread">Home</span></Link>  <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/external-right-arrows-those-icons-lineal-those-icons-1.png"/>  
                <span className="active-bread">Cart</span>
            </div>
            <div className="cart-wrapper">
                <div className="row">
                    <div className="col-lg-8 col-md-12">
                        <div className='row'>

                            {
                            productData.map((item,index)=>{
                                let prId = item._id
                                return(
                                    <div key = {index} className="col-lg-6 col-md-6 mb-4">
                                    <div className="cart-item">
                                    <div className="cart-pr-info">
                                        <img src={serverDomain+"/images/uploads/products/"+item.featuredImage} alt=""/>
                                        <div className="cart-pr-details">
                                            <h2>{item.name}</h2>
                                            <span>{item.categoryId.name}</span>
                                        </div>
                                    </div>
                                    {
                                        localData.map((item,index)=>{
                                            return(
                                                (item.productId===prId)?  
                                                (
                                                    <>
                                                    <div key = {index} className="variations-wrapper">
                                       {item.sizeData.length>0?( 
                                       <div className="item-size variation">
                                            <span>Item Size</span>
                                            <button className="btn btn-primary button active-button no-cursor">{item.sizeData[0].itemSize} ₹{item.sizeData[0].price}</button>
                                        </div>):(<div key = {index}></div>)}
                                        {
                                            item.addonData.length>0?(
                                                <div className="add-on variation">
                                                    <span>Add-ons List</span>
                                                    {item.addonData.map((item, index)=>{
                                                        return(
                                                            <div key={index} className="add-on">
                                                                <label className="form-check-label" htmlFor="20Off">
                                                                <span className="add-on-name">{item.addonName}</span><span>₹{item.addonPrice}</span>
                                                                </label>
                                                            </div>
                                                        )
                                                    })}
                                                 </div>
                                            ):(<div></div>)
                                        }
                                        </div>
                                        <h4 className='mt-3'>Total Price: ₹{item.totalPrice}</h4>
                                        <div className="product-count d-flex">
                                                <h5>Item : {item.count}</h5>
                                            <div className="buy-now-button">
                                                <button onClick={()=>{remove(index)}} className="btn btn-primary button remove">Remove</button>
                                            </div>
                                        </div></>
                                        ):(<div ></div>)
                                                )
                                            
                                        })
                                    }
                                    
                                </div>
                            </div>
                                )
                            })
                            }
                            
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12 mb-4">
                        <div className="price-calcualtor">
                            <div className="coupons">
                                <span>Have Coupons?</span>
                                <div className="coupon-form">
                                    <input type="text" onChange={(e)=>{setDiscountCode(e.target.value)}} className="coupon-wrap form-input" placeholder="Coupon Code"/>
                                    <button onClick={applyCoupon} className="btn btn-primary apply">Apply</button>
                                    {couponMessage.status==="invalid"?(<span className="invalid">{couponMessage.message}</span>):("")}
                                    {couponMessage.status==="valid"?(<span className="valid">{couponMessage.message}</span>):("")}

                                </div>
                            </div>
                            <div className="price-detail-wrap">
                                <div className="price-detail d-flex justify-content-between">
                                    <span> Total Amount:  </span>
                                    <span>₹{totalPrice}</span>
                                </div>
                               {discount?( <div className="price-detail d-flex justify-content-between">
                                    <span> Discount </span>
                                    <span className="discount">-₹{discountAmount.toFixed(0)}</span>
                                </div>):(<div></div>)}
                                <div className="price-detail d-flex justify-content-between">
                                    <span> Delivery:  </span>
                                    <span>₹{delivery}</span>
                                </div>
                                <div className="price-detail total-price d-flex justify-content-between">
                                    <span> Sub Total Amount </span>
                                    <span className="total">₹{subTotal.toFixed(0)}</span>
                                </div>
                                <button className="btn btn-primary order-now">Checkout</button>
                                <button className="btn btn-primary bts remove">BACK TO SHOP</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
      
    </>
  )
}
