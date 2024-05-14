import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Dashboard() {
  const navigate = useNavigate();
  const [authentication, setAuthentication] = useState(false);

  const auth = () => {
    axios({
      url: "http://localhost:3001/user/user-auth/",
      method: "post",
      data: {
        token: Cookies.get("userToken"),
      },
    })
      .then((res) => {
        if (res.data.status == 200) {
          setAuthentication(true);
        } else if (res.data.status == 400) {
          setAuthentication(false);
          navigate("/login");
        } else {
          setAuthentication(false);
          navigate("/login");
        }
      })
      .catch((err) => {
        if (err) {
          setAuthentication(false);
          navigate("/login");
        }
      });
  };
  useEffect(() => {
    auth();
  });


  return (
    <>
      <Header />
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto mt-5 mb-5 border-dash">
            <h2 className="mb-5">Dashboard</h2>
              <div className="row">
                <div className="col-md-3 dash-sidebar">
                  <div className="nav">
                    <span>
                      <Link to="/dashboard/profile">Profile</Link>
                    </span>
                  </div>
                  <div className="nav">
                    <span>
                      <Link to="/dashboard/address">Address</Link>
                    </span>
                  </div>
                  <div className="nav">
                    <span>
                      <Link to="/dashboard/order">Orders</Link>
                    </span>
                  </div>
                  <div className="nav">
                    <span>
                      <Link to="/dashboard/change-password">Change Password</Link>
                    </span>
                  </div>
                </div>
                <div className="col-md-9 dash-item">
                 
                <Outlet/>
                  



                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
