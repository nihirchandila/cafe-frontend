import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function OrdersDash() {
  const [data, setData] = useState([]);

  const getData = () => {
    axios({
      url: "http://localhost:3001/order/view/",
      method: "post",
    //   data: { userId: Cookies.get("userId") },
    data: {_id:"6581ded5de8afbeb5afe75da"}
    })
      .then((data) => {
        setData(data.data);

      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
    <h3 className="mb-4">Orders</h3>
    {
        data.map((data, index)=>{
            return(
                data.productsId.map((item, index)=>{
                    return(
                        <div key={index} className="row border-bottom gy-3 pb-3 mb-4">
                        <div className="col-lg-5">
                            <div className="me-lg-5">
                                <div className="d-flex align-items-start">
                                    <img src={`http://localhost:3001/images/uploads/products/` + item.productId.featuredImage[0]}
                                        className="border rounded me-3" style={{ width: "96px" , height: "auto"
                                        }} />
                                    <div className="align-items-left">
                                            {item.productId.name}
                                            <p className="h6">Price: ₹{item.productId.salePrice?(item.productId.salePrice): (item.productId.price)}</p>
                                            
                                        <p className="text-muted">Unit : {item.count}</p>
                                        <p className="h6">Date: {
                                            (
                                            function abc(){
                                                    let dateObj = new Date(data.timestamp)
                                                         
                                                    return(`${dateObj.getDate()}-${dateObj.getMonth()+1}-${dateObj.getFullYear()}`)
                                            })()
                                        }</p> <br />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                            <div className=""></div>
                            <div className="">
                            {item.addonData.map((item, index)=>{
                                return(
                                    <div key={index}>
                                    <h6>Addons</h6>
                                    <p>{item.addonName}: ₹{item.addonPrice}</p>
                                    </div>
                                )
                            })
                            }
                            {item.sizeData.map((item, index)=>{
                                return(
                                    <div key={index}>
                                    <h6>Size</h6>
                                    <p>{item.itemSize}: ₹{item.price}</p>
                                    </div>
                                )
                            })
                            }
                                <p className="h6">Subtotal: ₹{item.totalPrice}</p> <br />
                                <p className="h6">Order Status: {data.status}</p> <br />

                               
                            </div>
                        </div>
                        {/* <hr/> */}
    
                    </div>
                    )
                })
            )
        })
            
           
        
                                
    } 
                            
    </>
  );
}
