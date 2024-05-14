import React from "react";
import { siteDomain } from "../credentials.js";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="row footer-sm justify-content-between">
            <div className="short-description-footer col-lg-3 col-md-12">
              <Link to={siteDomain+"/"}>
              <img
                src={process.env.PUBLIC_URL+"/assets/images/logo_black.png"}
                className="footer-logo"
                alt=""
              />
              </Link>
              <p>
                At Cafe Du Tour, we believe in the power of good food to bring people together. Our journey began with a passion for creating delicious meals.
              </p>
            </div>
            <div className="shop-links-footer footer-links col-md-2 col-sm-3 col-6">
                <h4>Links</h4>
              
              <Link to={siteDomain+"/"}>
                <p>Home</p>
              </Link>
              <Link to={siteDomain+"/shop"}>
                <p>Shop</p>
              </Link>
              <Link to={siteDomain+"/cart"}>
                <p>Cart</p>
              </Link>
            </div>
            <div className="quick-links-footer footer-links col-md-2 col-sm-3 col-6">
              <h4>Categories</h4>
              <Link to={siteDomain+"/shop/category/:64c0e02c18c814c0a37b6755"}>
                <p>Deserts</p>
              </Link>
              <Link to={siteDomain+"/shop/category/:64c0e02018c814c0a37b6751"}>
                <p>Pasta</p>
              </Link>
              <Link to={siteDomain+"/shop/category/:64c0e00d18c814c0a37b674d"}>
                <p>Shakes</p>
              </Link>
              <Link to={siteDomain+"/shop/category/:64c0e00218c814c0a37b6749"}>
                <p>Waffles</p>
              </Link>
              
            </div>
            <div className="help-links-footer footer-links col-md-2 col-sm-3 col-6">
              <h4>Bestsellers</h4>
              <Link to={siteDomain+"/product/:65b2b22fd289c5624b9957e1"}>
                <p>Peppy Paneer Pizza</p>
              </Link>
              <Link to={siteDomain+"/product/:65b2b121d289c5624b9956dc"}>
                <p>Margherita</p>
              </Link>
              <Link to={siteDomain+"/product/:65ad738b79b24281d2873b60"}>
                <p>Plain Noodles</p>
              </Link>
              <Link to={siteDomain+"/product/:65ad736579b24281d2873b4e"}>
                <p>Sweet Corn Noodles</p>
              </Link>
             
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <p>Copyright © 2021 Trending Faces. All Rights Reserved.</p>
      </div>
    </>
  );
}
