import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function ProfileDash() {
  const [data, setData] = useState([]);

  const getData = () => {
    axios({
      url: "http://localhost:3001/user/view/",
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
        <h3 className="mb-4">User Profile</h3>

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
                  <span>Email: </span>
                  <p>{item.email}</p>
                </div>
              </div>
              <div className="col-md-12">
                <div className="d-flex">
                  <span>Phone Number: </span>
                  <p>{item.phone}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
