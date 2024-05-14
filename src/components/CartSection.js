import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { serverDomain, siteDomain } from '../credentials';
import { Link } from 'react-router-dom';
import { useCartContext } from '../context/CartContext.js';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function CartSection() {
    const navigate = useNavigate()
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
    const {setCount} = useCartContext();
    const [authentication, setAuthentication] = useState(false);
    const [couponActive, setCouponActive] = useState({coupon: false})

    const getproductData = ()=>{
        const localStorageData = localStorage.getItem("cartItem");
        if(localStorageData){
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
    }

    const auth = ()=>{
        axios({
          url: "http://localhost:3001/user/user-auth/",
          method:"post",
          data: {
            token: Cookies.get("userToken")
          }
        }).then((res)=>{
          if(res.data.status==200){
            setAuthentication(true)
            console.log("auth sucess")
          }else if(res.data.status==400){
            setAuthentication(false)
            console.log("auth failed")
          }else{
            setAuthentication(false)
                        console.log("auth failed")

          }
        }).catch((err)=>{
          if(err){
            setAuthentication(false)
            console.log("auth failed")
          }
        })
    }
    useEffect(()=>{
        
        getproductData()
        auth()
    },[])

    const remove = (index)=>{
        const localData = localStorage.getItem("cartItem");
        const parsedData = JSON.parse(localData);
        parsedData.splice(index, 1);
        localStorage.setItem("cartItem", JSON.stringify(parsedData));
        setLocalData(parsedData);
        setCount(parsedData.length)
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
                    setSubTotal(totalPrice+delivery-res.data[0].off/100*totalPrice)//why have to write like this and not only the state name Answer = use a variable instead of state and update the variable in every state like this const discountAmount = res.data[0].off / 100 * totalPrice;

                    const couponDetails = {
                        coupon : true,
                        couponName: res.data[0].name,
                        couponDiscount: res.data[0].off,
                        discount: res.data[0].off/100*totalPrice
                    }
                    setCouponActive(couponDetails)
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
    const checkout = ()=>{
        if(productData.length>0){
        const orderDetails = {
            delivery: delivery,
            productsTotal: totalPrice,
            subTotal: subTotal
        }
        const orderData = {...orderDetails, ...couponActive}
        localStorage.setItem("amountDetails", JSON.stringify(orderData))
        navigate('/checkout');
        }else{
            alert('Please add some product to cart')
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
                            productData.length>0?(
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
                                            <h6>Price: ₹{item.salePrice?item.salePrice:item.price}</h6>
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
                            ):(<h2>No Items in Cart</h2>)
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
                           {productData.length>0?(
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
                             {authentication?(<button onClick={checkout} className="btn btn-primary order-now">Checkout</button>):(<Link to="/login"><button className="btn btn-primary order-now">Login/Signup</button></Link>)}
                             <Link to={siteDomain+"/shop"}><button className="btn btn-primary bts remove">BACK TO SHOP</button></Link>
                         </div>
                           ):(<div></div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
      
    </>
  )
}
