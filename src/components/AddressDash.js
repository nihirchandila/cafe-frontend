import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function AddressDash() {
  const [data, setData] = useState([]);

  const getData = () => {
    axios({
      url: "http://localhost:3001/address/view/",
      method: "post",
      data: { _id: Cookies.get("userId") },
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
        <h3 className="mb-4">Address</h3>

      {data.map((item, index) => {
        return (
          <div className="profile">
            <div className="row">
              <div className="col-md-12">
                <div className="d-flex">
                  <span>Name: </span>
                  <p>{item.name}</p>
                </div>
              </div>
              <div className="col-md-12">
                <div className="d-flex">
                  <span>House Number: </span>
                  <p>{item.street}</p>
                </div>
              </div>
              <div className="col-md-12">
                <div className="d-flex">
                  <span>City: </span>
                  <p>{item.city}</p>
                </div>
              </div>
              <div className="col-md-12">
                <div className="d-flex">
                  <span>State: </span>
                  <p>{item.state}</p>
                </div>
              </div>
              <div className="col-md-12">
                <div className="d-flex">
                  <span>Pincode: </span>
                  <p>{item.zipcode}</p>
                </div>
              </div>
              <div className="col-md-12">
                <div className="d-flex">
                  <span>Phone Number: </span>
                  <p>{item.phone}</p>
                </div>
              </div>
              <div className="col-md-12">
                <div className="d-flex">
                  <span>Country: </span>
                  <p>{item.country}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
