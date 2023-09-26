import React from "react";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="row footer-sm justify-content-between">
            <div className="short-description-footer col-lg-3 col-md-12">
              <img
                src={process.env.PUBLIC_URL+"/assets/images/logo_black.png"}
                className="footer-logo"
                alt=""
              />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                ipsum
              </p>
            </div>
            <div className="shop-links-footer footer-links col-md-2 col-sm-3 col-6">
              <a href="#">
                <h4>Shop Now</h4>
              </a>
              <a href="#">
                <p>Shop</p>
              </a>
              <a href="#">
                <p>Wall Decor</p>
              </a>
              <a href="#">
                <p>Lights</p>
              </a>
              <a href="#">
                <p>Tables</p>
              </a>
              <a href="#">
                <p>Decoration</p>
              </a>
            </div>
            <div className="quick-links-footer footer-links col-md-2 col-sm-3 col-6">
              <a href="#">
                <h4>Shop Now</h4>
              </a>
              <a href="#">
                <p>Shop</p>
              </a>
              <a href="#">
                <p>Wall Decor</p>
              </a>
              <a href="#">
                <p>Lights</p>
              </a>
              <a href="#">
                <p>Tables</p>
              </a>
              <a href="#">
                <p>Decoration</p>
              </a>
            </div>
            <div className="help-links-footer footer-links col-md-2 col-sm-3 col-6">
              <a href="#">
                <h4>Shop Now</h4>
              </a>
              <a href="#">
                <p>Shop</p>
              </a>
              <a href="#">
                <p>Wall Decor</p>
              </a>
              <a href="#">
                <p>Lights</p>
              </a>
              <a href="#">
                <p>Tables</p>
              </a>
              <a href="#">
                <p>Decoration</p>
              </a>
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
