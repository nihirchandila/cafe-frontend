import React from "react";
import BestsellerProducts from "./BestsellerProducts";
import Categories from "./Categories";
import {siteDomain} from "../credentials.js"
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <>
      <div className="hero-wrapper mt-5">
        <div className="container">
          <div className="hero-section">
            <img
              className="hero-logo-center"
              src="./assets/images/logo-hero.png"
              alt="cafe du
      tour logo"
            />
            <div className="row justify-content-between">
              <div className="content col-lg-6 col-md-7">
                <strong>
                  Experience the ambience
                  <br /> and taste at
                </strong>
                <span>Cafe Du Tour</span>
                <p>
                At Cafe Du Tour, we believe in the power of good food to bring people together. Our journey began with a passion for creating delicious meals using fresh, locally sourced ingredients.
                </p>
                <Link className="btn btn-light" to={siteDomain+"/shop"}>
                  Order Now
                </Link>
              </div>
              <div className="image col-lg-5 col-md-4 text-end">
                <img
                  src="./assets/images/hero-image.png"
                  className="hero-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    <div className="spacer"></div>
    <div className="about-section">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="about-intro col-md-7">
            <h2>Welcome to Cafe Du Tour, where every dish tells a story.</h2>
            <p>We are dedicated to providing a memorable dining experience for our customers. From the moment you step into Cafe Du Tour you'll be greeted with a warm and inviting atmosphere that sets the stage for a wonderful meal. Our team is passionate about food and strives to create dishes that are not only delicious but also nourishing for the body and soul.</p>
            <Link to={siteDomain+"/shop"}><button className="btn btn-primary">Order Now</button></Link>
          </div>
          <div className="intro-image col-lg-4 col-md-5 col-sm-8 col-8">
            <img src="./assets/images/intro.png" alt=""/>
          </div>
        </div>
      </div>
    </div>
    <div className="spacer"></div>

    <Categories/>
    {/* categories component */}

    <div className="spacer-30"></div>
    <BestsellerProducts/>
    <div className="coupons-sections">
      <div className="container">
        <div className="sec-heading m-auto mb-5 text-center col-md-7">
          <h2>Get best coupons and discounts from us</h2>
        </div>
        <div className="coupons">
          <div className="row">
            <div className="col-md-6 col-sm-6 coupon-card coupon-card-1">
              <img src="./assets/images/home_03.png" alt="offer"/>
            </div>
            <div className="col-md-6 col-sm-6 coupon-card coupon-card-2">
              <img src="./assets/images/home_05.png" alt="offer"/>
            </div>
          </div>
      </div>
      </div>
    </div>
    <div className="spacer"> </div>
    </>
  );
}
