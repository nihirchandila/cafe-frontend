import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { serverDomain } from '../credentials'

export default function ProductSingle(props) {
    const [data, setData]= useState([])
    const [bestseller, setBestseller]= useState([])
    const [imagePreview, setImagePreview]=useState()
    const [itemCount, setItemCount] = useState(1);
    const [price,setPrice] = useState()
    const [addonSelected, setAddonSelected] = useState([])
    const [sizeSelected, setSizeSelected] = useState([])
    const [itemCartStatus, setItemCartStatus] = useState(false)


    const productId = props.id
    const getProduct = ()=>{
        axios({
            url: "http://localhost:3001/product/view/",
            method:"post",
            data: {
                _id: productId
            } 
        }).then((res)=>{
            setData(res.data)
            setImagePreview(res.data[0].featuredImage[0])
            setPrice(res.data[0].price)
        }).catch((err)=>{
            console.log(err)
        })
    }
    const cartStatus = ()=>{
        const getLocalData = localStorage.getItem("cartItem");
        const parsedLocalData =  JSON.parse(getLocalData);
        if(parsedLocalData){
            parsedLocalData.map((item, index)=>{
                if(item.productId===productId){
                    setItemCartStatus(true)
                }
            })
        }
    } 
    const getBestsellers = ()=>{
        axios({
            url: "http://localhost:3001/bestseller/view/",
            method:"post",
            data: {
            } 
        }).then((res)=>{
            setBestseller(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        getProduct();
        getBestsellers()
        cartStatus()  
    },[])

    const handleImagePreview = (e)=>{
        setImagePreview(e.target.attributes.value.value);
        const clickedButton = e.target;
        const buttons = document.querySelectorAll('.image-acc');
        buttons.forEach(button => {
          if (button === clickedButton) {
            button.classList.add('selected');
          } else {
            button.classList.remove('selected');
          }
        });
    }
    useEffect(()=>{
        const sizeButtons = document.querySelectorAll(".size-buttons");
        if(sizeButtons[0]){
            sizeButtons[0].click();
            sizeButtons[0].classList.add('active-button')
        }
    },[data])
    const handleProductSize = (e)=>{
        const itemSize = e.target.attributes.value.value;
        const price = e.target.attributes.price.value;
        const sizeData = []
        sizeData.push({itemSize, price})
        const allButtons = document.querySelectorAll(".size-buttons");
        allButtons.forEach((item, index)=>{
            if(item===e.target){
                item.classList.add("active-button")
            }else{
                item.classList.remove("active-button")
            }
        })
        console.log(sizeData);
        setSizeSelected(sizeData)
        
    }
    const handleProductAddon = (e)=>{
        if(e.target.checked){
            e.target.setAttribute("check", "true");
        }else{
            e.target.setAttribute("check", "false");
        }
        const addonsList = document.querySelectorAll(".addon-check");
        const selectedAddons = [];
        addonsList.forEach((item, index)=>{
            if(item.getAttribute('check')=='true'){
                const addonPrice = item.getAttribute('price');
                const addonName = item.getAttribute("value")
                selectedAddons.push({addonPrice, addonName})
            }
        })
        console.log(selectedAddons)
        setAddonSelected(selectedAddons)
    }
   
    const submit = ()=>{
        const itemPrice = Number(price);
        let addonPrice = 0;
        let sizePrice = 0
        if(sizeSelected.length>0){
            sizePrice = Number(sizeSelected[0].price);
        }
        if(addonSelected.length>0){
            addonSelected.map((item)=>{
                let number = Number(item.addonPrice)
                addonPrice += number
            })
        }
        const totalProductPrice = sizePrice+addonPrice
        const data = {
            productId: productId,
            sizeData : sizeSelected,
            addonData: addonSelected,
            count: itemCount,
            totalPrice: totalProductPrice
        }

        const localData = localStorage.getItem("cartItem");
        const parsedData = JSON.parse(localData);
        let newData = []
        if(localData){
            newData = [...parsedData, data]
        }else{
            newData = [data]
        }
        // console.log(newData);
        localStorage.setItem("cartItem", JSON.stringify(newData));
        setItemCartStatus(true)
    }

  return (
    <>
    {
        data?(
        data.map((item,index)=>{
            return(
                <div key={index} className="product-single">
                        <div className="container">
                            <div className="breadcrumbs">
                                <Link to="/home"><span className="inactive-bread">Home</span></Link>  <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/external-right-arrows-those-icons-lineal-those-icons-1.png"/> 
                                <Link to="/shop"><span className="inactive-bread">Shop
                                </span></Link> <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/external-right-arrows-those-icons-lineal-those-icons-1.png"/>
                                <Link to={`/product/:${item._id}`}><span className="active-bread">{item.name}</span></Link>
                            </div>
                            <div className="row">
                                <div className="col-lg-7 col-md-12">
                                    <div className="single-product-image">
                                        <div className="preview">
                                            <img className="preview-image" src={serverDomain+"/images/uploads/products/"+imagePreview} alt=""/>
                                            {item.salePrice?(
                                                 <span className="sale-icon">{Math.round(((item.price-item.salePrice)/item.price)*100)+"%"}</span>
                                            ): (<div></div>)}
                                            
                                            {
                                                bestseller?(
                                                bestseller.map((bestseller,index)=>{
                                                    if(bestseller.productId._id==item._id){
                                                        return(
                                                            <span key={index} className="bestseller">Bestseller</span>
                                                        )
                                                    }
                                                })
                                                ):("")
                                            }
                                        </div>
                                        <div className="acc">
                                        {item.featuredImage[0]?(<img onClick={(e)=>{handleImagePreview(e)}} value={item.featuredImage[0]} className="image-acc selected" src={serverDomain+"/images//uploads/products/"+item.featuredImage[0]} alt=""/>):("")}
                                            {
                                                item.productImages.length>0?(
                                                item.productImages.map((item,index)=>{
                                                    return(
                                                        <img key={index} onClick={(e)=>{handleImagePreview(e)}} className="image-acc" value={item} src={serverDomain+"/images//uploads/products/"+item} alt=""/>
                                                    )
                                                })
                                                ):("")
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-5 col-md-12">
                                    <div className="single-product-info">
                                        <div className="product-info">
                                            <div className="product-name d-flex align-items-center">
                                                <div className="veg-status">
                                                {item.veg==true?(
                                                    <img src={process.env.PUBLIC_URL+`/assets/images/veg.png`} alt="veg icon" />
                                                ): ( <img src={process.env.PUBLIC_URL+`/assets/images/non-veg.png`}  alt="veg icon" />)}
                                                </div>
                                                <h1>{item.name}</h1>
                                            </div>
                                            <div className="sale">
                                            {
                                                item.salePrice?(
                                                <>
                                                <span className="line-through">₹{item.price}</span>
                                                <span className="sale-amount">₹{item.salePrice}</span>
                                                </>
                                                ): (
                                                    <span className="sale-amount">₹{item.price}</span>
                                                )
                                            }
                                            </div>
                                            <div className="cooking-time d-flex align-items-center">
                                                <div className="svg-clock">
                                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48"
                                                        style={{fill:"#ba502d"}}>
                                                        <path d="M24,4C12.972,4,4,12.972,4,24s8.972,20,20,20s20-8.972,20-20S35.028,4,24,4z M28.561,30.561	C28.268,30.854,27.884,31,27.5,31s-0.768-0.146-1.061-0.439l-5-5C21.158,25.279,21,24.898,21,24.5v-11c0-0.829,0.671-1.5,1.5-1.5	s1.5,0.671,1.5,1.5v10.379l4.561,4.561C29.146,29.025,29.146,29.975,28.561,30.561z"></path>
                                                    </svg>
                                                </div>
                                                <span className="time-string">Cooking Time: </span>
                                                <span className="time-numeric">{item.cookingTime} Minutes</span>
                                            </div>
                                        </div>
                                        <div className="variations-wrapper">
                                            {item.sizeVariation.length>0?(
                                                <div className="item-size variation">
                                                    <span>Select size</span>
                                                    {
                                                        item.sizeVariation.map((item,index)=>{
                                                            return(
                                                                <>

                                                                <button key={index} onClick={handleProductSize} value={item.size} price={item.price} className="btn btn-primary button size-buttons">{item.size} ₹{item.price}</button>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            ):(<div></div>)
                                            }
                                            {
                                                item.addons.length>0?( 
                                                    <div className="add-on variation">
                                                    <span>Choose Your Add-ons</span>
                                                        {item.addons.map((item,index)=>{
                                                            return(
                                                            <div className="add-on" key={index}>
                                                                <input className="form-check-input addon-check" type="checkbox" onChange={handleProductAddon} value={item.name} price={item.price} id="20Off"/>
                                                                <label className="form-check-label" htmlFor="20Off">
                                                                <span className="add-on-name">{item.name}</span><span>{item.price}</span>
                                                                </label>
                                                            </div>
                                                            )
                                                        })}
                                                    </div>
                                                ):(<div></div>)
                                            }
                                        </div>
                                        <div className="product-count d-flex">
                                            <div className="count">
                                                <button className="btn decrement" onClick={()=>{if(itemCount>1){setItemCount(itemCount-1)}}}>-</button>
                                                <span>{itemCount}</span>
                                                <button className="btn increment" onClick={()=>{if(itemCount<5){setItemCount(itemCount+1)}}}>+</button>
                                            </div>
                                            <div className="buy-now-button">
                                                {/* //button */}
                                                {itemCartStatus?(<button className="btn btn-primary button buy-now added-to-cart">Added To Cart</button>):(<button onClick={submit}  className="btn btn-primary button buy-now">Add To Cart</button>)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-description">
                                <h3>About the item</h3>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    </div>
            )
        })
        ):(<h2>No Data Found, Please Try Again Later</h2>)
        
    }
    
    </>
  )
}
