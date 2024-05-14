import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import axios from "axios";
import {serverDomain} from "../credentials.js"
import { useNavigate } from "react-router-dom";
import { useCartContext } from '../context/CartContext.js'
import Cookies from "js-cookie";


export default function CheckoutSection() {
  const navigate = useNavigate();
  const {cartCount, setCount} = useCartContext();

  const {register, handleSubmit, formState: { errors }} = useForm()



  const onSubmit = (data)=>{
    const localData = JSON.parse(localStorage.getItem("cartItem"));
    const amountData = JSON.parse(localStorage.getItem("amountDetails"));
    const formData = {};
    formData["productsId"] = localData;
    formData["userId"] = Cookies.get("userId")
    const getData = {...formData, ...data, ...amountData};
    console.log(getData);
    axios({
      url: serverDomain+"/order/add/",
      method: "post",
      data: getData
    }).then((res)=>{
      if(res.data.status==200){
        localStorage.removeItem("cartItem");
        localStorage.removeItem("amountDetails");
        setCount(0)
        navigate("/confirm")
      }else{
        alert("There is some error, Please try again later")
      }
      

    }).catch((err)=>{
      console.log(err)
    })
  }
  return (
    <>
      <div className="checkout-wrap">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/home">
              <span className="inactive-bread">Home</span>
            </Link>{" "}
            <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/external-right-arrows-those-icons-lineal-those-icons-1.png" />
            <Link to="/cart">
              <span className="inactive-bread">Cart</span>
            </Link>{" "}
            <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/external-right-arrows-those-icons-lineal-those-icons-1.png" />
            <span className="active-bread">Checkout</span>
          </div>
          <h3 className="mb-3">Checkout</h3>
          <div className="card shadow-0 border mb-4">
            <div className="p-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-6 mb-3">
                    <p className="mb-0">First name</p>
                    <div className="form-outline">
                      <input
                        type="text"
                        id="typeText"
                        placeholder="Type here"
                        className="form-control"
                        name="firstname"
                        {...register('firstname', {required: "First Name is required"})}
                      />
                      <p className="errors">{errors?.firstname && errors.firstname.message}</p>
                    </div>
                  </div>

                  <div className="col-6">
                    <p className="mb-0">Last name</p>
                    <div className="form-outline">
                      <input
                        type="text"
                        id="typeText"
                        placeholder="Type here"
                        className="form-control"
                        name ="lastname"
                       {...register('lastname', {required:"Last Name is required"})}
                      />
                      <p className="errors">{errors?.lastname && errors.lastname.message}</p>
                    </div>
                  </div>

                  <div className="col-6 mb-3">
                    <p className="mb-0">Phone</p>
                    <div className="form-outline">
                      <input type="number" id="typePhone" className="form-control" name= "number" {...register('number', {required: "Phone Number is required"})} />
                      <p className="errors">{errors?.number && errors.number.message}</p>
                    </div>
                  </div>

                  <div className="col-6 mb-3">
                    <p className="mb-0">Email</p>
                    <div className="form-outline">
                      <input
                        type="email"
                        id="typeEmail"
                        placeholder="example@gmail.com"
                        className="form-control"
                        {...register("email", {required: "Email is required"})}
                      />
                      <p className="errors">{errors?.email && errors.email.message}</p>
                    </div>
                  </div>
                  <div className="col-sm-8 mb-3">
                    <p className="mb-0">Address</p>
                    <div className="form-outline">
                      <input
                        type="text"
                        id="typeText"
                        placeholder="Type here"
                        className="form-control"
                        {...register("address", {required: "Address is required"})}
                      />
                      <p className="errors">{errors?.address && errors.address.message}</p>
                    </div>
                  </div>

                  <div className="col-sm-4 mb-3">
                    <p className="mb-0">City</p>
                    <input
                        type="text"
                        id="typeText"
                        placeholder="City"
                        className="form-control"
                        {...register("city", {required: "City is required"})}
                      />
                      <p className="errors">{errors?.city && errors.city.message}</p>
                  </div>

                  <div className="col-sm-4 mb-3">
                    <p className="mb-0">House Number</p>
                    <div className="form-outline">
                      <input
                        type="text"
                        id="typeText"
                        placeholder="Type here"
                        className="form-control"
                        {...register("housenumber", {required: "House Number is required"})}
                      />
                      <p className="errors">{errors?.housenumber && errors.housenumber.message}</p>
                    </div>
                  </div>

                  <div className="col-sm-4 col-6 mb-3">
                    <p className="mb-0">Pin Code</p>
                    <div className="form-outline">
                      <input type="number" id="typeText" className="form-control"  {...register("pincode", {required: "Pin Code is required"})}/>
                      <p className="errors">{errors?.pincode && errors.pincode.message}</p>
                    </div>
                  </div>


                </div>
                <button className="btn btn-primary mt-3 order-now" type="submit">Place Order</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
