import React from "react";
import BestsellerProducts from "./BestsellerProducts";
import Categories from "./Categories";

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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quis ipsum suspendisse ultrices gravida.
                </p>
                <button className="btn btn-light" href="#">
                  Order Now
                </button>
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
            <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.
              Risus commodo viverra maecenas accumsan lacus
              vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit</p>
            <button className="btn btn-primary">Order Now</button>
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
          <h2>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do</h2>
        </div>
        <div className="coupons">
          <div className="row">
            <div className="col-md-6 col-sm-6 coupon-card coupon-card-1">
              <a href=""><img src="./assets/images/home_03.png" alt="offer"/></a>
            </div>
            <div className="col-md-6 col-sm-6 coupon-card coupon-card-2">
              <a href=""><img src="./assets/images/home_05.png" alt="offer"/></a>
            </div>
          </div>
      </div>
      </div>
    </div>
    <div className="spacer"> </div>
    </>
  );
}
